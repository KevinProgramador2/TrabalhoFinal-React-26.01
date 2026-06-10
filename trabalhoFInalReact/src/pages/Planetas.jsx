import { useEffect, useState } from "react";
import FormPlaneta from "../components/FormPlaneta";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const url = "/planetas";

function Planetas() {
  const { nomeUsuario } = useAuth();
  const [planetas, setPlanetas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [formPlaneta, setFormPlaneta] = useState({
    nome: "",
    galaxia: "",
    clima: "",
    habitavel: false,
    descricao: "",
  });

  function limparFormulario() {
    setFormPlaneta({
      nome: "",
      galaxia: "",
      clima: "",
      habitavel: false,
      descricao: "",
    });
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  async function buscarPlanetas() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setPlanetas(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar planetas:", error);
    } finally {
      setLoading(false);
    }
  }

  async function cadastrarPlaneta(event) {
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.post(url, formPlaneta);
      setPlanetas((listaAtual) => [...listaAtual, resposta.data]);
      limparFormulario();
      setModalAberto(false);
      setMensagem("Planeta cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar planeta:", error);
      setMensagem("Erro ao cadastrar planeta.");
    }
  }

  useEffect(() => {
    buscarPlanetas();
  }, []);

  return (
    <section>
      <h1>Planetas</h1>
      {nomeUsuario && <p className="usuario-logado">Olá, {nomeUsuario}</p>}

      <button
        className="open-modal-button"
        onClick={() => setModalAberto(true)}
        type="button"
      >
        Cadastrar planeta
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormPlaneta
              cadastrarPlaneta={cadastrarPlaneta}
              fecharModal={fecharModal}
              formPlaneta={formPlaneta}
              setFormPlaneta={setFormPlaneta}
            />
          </div>
        </div>
      )}

      {mensagem && <p className="mensagem">{mensagem}</p>}

      {loading ? (
        <p>Carregando planetas...</p>
      ) : (
        <div className="alien-list">
          {planetas.map((planeta) => (
            <article className="alien-card" key={planeta.id}>
              <h3>
                {planeta?.nome === "string"
                  ? "Nome não disponível"
                  : planeta?.nome}
              </h3>
              <p>
                <strong>Galáxia:</strong> {planeta?.galaxia}
              </p>
              <p>
                <strong>Clima:</strong> {planeta?.clima}
              </p>
              <p>
                <strong>Habitável:</strong> {planeta?.habitavel ? "Sim" : "Não"}
              </p>
              <p>
                <strong>Descrição:</strong> {planeta?.descricao}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Planetas;
