import { useEffect, useState } from "react";
import FormAlien from "../components/FormAlien";
import { useAuth } from "../contexts/AuthContext";
import api from "../services/api";

const url = "/aliens";

function Aliens() {
  const { nomeUsuario } = useAuth();
  const [modeEdit, setModeEdit] = useState(false);
  const [aliens, setAliens] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [formAlien, setFormAlien] = useState({
    nome: "",
    especie: "",
    planeta: "",
    periculosidade: 1,
    descricao: "",
  });

  function limparFormulario() {
    setFormAlien({
      nome: "",
      especie: "",
      planeta: "",
      periculosidade: 1,
      descricao: "",
    });
  }

  function fecharModal() {
    setModalAberto(false);
    limparFormulario();
  }

  async function buscarAliensComAxios() {
    try {
      setLoading(true);
      const resposta = await api.get(url);
      setAliens(resposta.data);
    } catch (error) {
      console.error("Erro ao buscar aliens com axios:", error);
    } finally {
      setLoading(false);
    }
  }

  async function deletarAlien(id) {
    try {
      setMensagem("");
      await api.delete(`${url}/${id}`);
      setAliens((listaAtual) => listaAtual.filter((alien) => alien.id !== id));
      setMensagem("Alien excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir alien:", error);
      setMensagem("Erro ao excluir alien.");
    }
  };

  async function editarAlien(alien, id) {
    setMensagem("");
    setFormAlien(alien);
    setModeEdit(true);
    setModalAberto(true);
    try {
       const resposta = await api.get(`${url}/${id}`);
    setAliens((listaAtual) => [...listaAtual, resposta.data]);
    setMensagem('Alien editado com sucesso!')

    } catch (error) {
      console.log()("Erro ao buscar alien para edição:", error);
      setMensagem("Erro ao buscar alien para edição.");
    }
   
  }


  async function cadastrarAlien(event) {
    setModeEdit(false);
    event.preventDefault();
    setMensagem("");

    try {
      const resposta = await api.post(url, formAlien);
      setAliens((listaAtual) => [...listaAtual, resposta.data]);
      limparFormulario();
      setModalAberto(false);
      setMensagem("Alien cadastrado com sucesso!");

    } catch (error) {
      console.error("Erro ao cadastrar alien:", error);
      setMensagem("Erro ao cadastrar alien.");
    }
  }

  useEffect(() => {
    buscarAliensComAxios();
  }, []);


  
  return (
    <section>
      <h1>Aliens</h1>
      {nomeUsuario && <p className="usuario-logado">Olá, {nomeUsuario}</p>}

      <button
        className="open-modal-button"
        onClick={() => setModalAberto(true)}
        type="button"
      >
        Cadastrar alien
      </button>

      {modalAberto && (
        <div className="modal-overlay">
          <div className="modal-content">
            <FormAlien
              modeEdit={modeEdit}
              cadastrarAlien={cadastrarAlien}
              fecharModal={fecharModal}
              formAlien={formAlien}
              setFormAlien={setFormAlien}
            />
          </div>
        </div>
      )}


      {mensagem && <p className="mensagem">{mensagem}</p>}
      {loading ? (
        <p>Carregando aliens...</p>
      ) : (
        <div className="alien-list">
          {aliens.map((alien) => (
            <article className="alien-card" key={alien.id}>
              <h3>
                {alien?.nome === "string" ? "Nome não disponível" : alien?.nome}
              </h3>
              <p>
                <strong>Espécie:</strong> {alien?.especie}
              </p>
              <p>
                <strong>Planeta:</strong> {alien?.planeta}
              </p>
              <p>
                <strong>Periculosidade:</strong> {alien?.periculosidade}
              </p>
              <p>
                <strong>Descrição:</strong> {alien?.descricao}
              </p>
              <div className="card-actions">
                <button onClick={() => deletarAlien(alien.id)} className="button-excluir">Excluir</button>

                
                <button onClick={() => editarAlien(alien, alien.id)} className="button-secondary">Editar</button>
              </div>

            </article>
          ))}
        </div>)}
    </section>
  );
}

export default Aliens;