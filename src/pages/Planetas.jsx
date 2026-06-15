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

  const [editando, setEditando] = useState(false);
  const [idPlanetaEditando, setIdPlanetaEditando] = useState(null);

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
    setEditando(false);
    setIdPlanetaEditando(null);
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

    try {
      const resposta = await api.post(url, formPlaneta);

      setPlanetas((listaAtual) => [
        ...listaAtual,
        resposta.data,
      ]);

      setMensagem("Planeta cadastrado com sucesso!");
      fecharModal();
    } catch (error) {
      console.error("Erro ao cadastrar planeta:", error);
      setMensagem("Erro ao cadastrar planeta.");
    }
  }

  function prepararEdicao(planeta) {
    setFormPlaneta({
      nome: planeta.nome,
      galaxia: planeta.galaxia,
      clima: planeta.clima,
      habitavel: planeta.habitavel,
      descricao: planeta.descricao,
    });

    setIdPlanetaEditando(planeta.id);
    setEditando(true);
    setModalAberto(true);
  }

  async function atualizarPlaneta(event) {
    event.preventDefault();

    try {
      const resposta = await api.put(
          `${url}/${idPlanetaEditando}`,
          formPlaneta
      );

      setPlanetas((listaAtual) =>
          listaAtual.map((planeta) =>
              planeta.id === idPlanetaEditando
                  ? resposta.data
                  : planeta
          )
      );

      setMensagem("Planeta atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar planeta:", error);
      setMensagem("Erro ao atualizar planeta.");
    }
  }

  async function excluirPlaneta(id) {
    const confirmar = window.confirm(
        "Deseja realmente excluir este planeta?"
    );

    if (!confirmar) return;

    try {
      await api.delete(`${url}/${id}`);

      setPlanetas((listaAtual) =>
          listaAtual.filter(
              (planeta) => planeta.id !== id
          )
      );

      setMensagem("Planeta removido com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir planeta:", error);
      setMensagem("Erro ao excluir planeta.");
    }
  }

  useEffect(() => {
    buscarPlanetas();
  }, []);

  return (
      <section>
        <h1>Planetas</h1>

        {nomeUsuario && (
            <p className="usuario-logado">
              Olá, {nomeUsuario}
            </p>
        )}

        <button
            className="open-modal-button"
            onClick={() => {
              limparFormulario();
              setEditando(false);
              setModalAberto(true);
            }}
        >
          Cadastrar planeta
        </button>

        {modalAberto && (
            <div className="modal-overlay">
              <div className="modal-content">
                <FormPlaneta
                    onSubmit={
                      editando
                          ? atualizarPlaneta
                          : cadastrarPlaneta
                    }
                    fecharModal={fecharModal}
                    formPlaneta={formPlaneta}
                    setFormPlaneta={setFormPlaneta}
                    editando={editando}
                />
              </div>
            </div>
        )}

        {mensagem && (
            <p className="mensagem">{mensagem}</p>
        )}

        {loading ? (
            <p>Carregando planetas...</p>
        ) : (
            <div className="alien-list">
              {planetas.map((planeta) => (
                  <article
                      className="alien-card"
                      key={planeta.id}
                  >
                    <h3>{planeta.nome}</h3>

                    <p>
                      <strong>Galáxia:</strong>{" "}
                      {planeta.galaxia}
                    </p>

                    <p>
                      <strong>Clima:</strong>{" "}
                      {planeta.clima}
                    </p>

                    <p>
                      <strong>Habitável:</strong>{" "}
                      {planeta.habitavel
                          ? "Sim"
                          : "Não"}
                    </p>

                    <p>
                      <strong>Descrição:</strong>{" "}
                      {planeta.descricao}
                    </p>

                    <div className="acoes-card">
                      <button
                          onClick={() =>
                              prepararEdicao(planeta)
                          }
                      >
                        Editar
                      </button>

                      <button
                          onClick={() =>
                              excluirPlaneta(planeta.id)
                          }
                      >
                        Excluir
                      </button>
                    </div>
                  </article>
              ))}
            </div>
        )}
      </section>
  );
}

export default Planetas;