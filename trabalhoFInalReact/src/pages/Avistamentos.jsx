import { useEffect, useState } from "react";
import api from "../services/api";
import FormAvistamento from "../components/FormAvistamento";

function Avistamentos() {
  const [avistamentos, setAvistamentos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mensagem, setMensagem] = useState("");

  // Criei um estado para saber se estamos editando ou criando
  const [idSendoEditado, setIdSendoEditado] = useState(null);

  const [payload, setPayload] = useState({
    titulo: "",
    local: "",
    descricao: "",
    data: "",
    nivelMedo: 1,
  });

  async function buscarAvistamentos() {
    setLoading(true);
    try {
      const resp = await api.get("/avistamentos");
      setAvistamentos(resp.data);
    } catch (error) {
      console.error("Erro ao buscar avistamentos:", error);
    } finally {
      setLoading(false);
    }
  }

  //  FUNÇÃO DELETAR
  async function deletarAvistamento(id) {
    if (!window.confirm("Tem certeza que deseja excluir este avistamento?"))
      return;

    try {
      setMensagem("");
      await api.delete(`/avistamentos/${id}`);

      setAvistamentos((listaAtual) =>
        listaAtual.filter((item) => item.id !== id),
      );

      setMensagem("Avistamento excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir avistamento:", error);
      setMensagem("Erro ao excluir avistamento.");
    }
  }

  // FUNÇÃO EDITAR
  async function editarAvistamento(id, dadosAtualizados) {
    setLoading(true);
    try {
      setMensagem("");
      const resp = await api.put(`/avistamentos/${id}`, dadosAtualizados);

      setAvistamentos((listaAtual) =>
        listaAtual.map((item) => (item.id === id ? resp.data : item)),
      );

      setMensagem("Avistamento atualizado com sucesso!");
      fecharModal();
    } catch (error) {
      console.error("Erro ao atualizar avistamento:", error);
      setMensagem("Erro ao atualizar avistamento.");
    } finally {
      setLoading(false);
    }
  }

  // Função para preparar o modal com os dados do item que será editado
  function abrirEdicao(avistamento) {
    setIdSendoEditado(avistamento.id);
    setPayload(avistamento);
    setOpenModal(true);
  }

  useEffect(() => {
    buscarAvistamentos();
  }, []);

  function limparFormulario() {
    setPayload({
      titulo: "",
      local: "",
      descricao: "",
      data: "",
      nivelMedo: 1,
    });
    setIdSendoEditado(null);
  }

  function fecharModal() {
    setOpenModal(false);
    limparFormulario();
  }

  async function salvarAvistamento(event) {
    event.preventDefault();

    // Se tiver um ID sendo editado, faz PUT. Se não, faz POST (Cadastro)
    if (idSendoEditado) {
      await editarAvistamento(idSendoEditado, payload);
    } else {
      try {
        const resposta = await api.post("/avistamentos", payload);
        setAvistamentos((listaAtual) => [...listaAtual, resposta.data]);
        fecharModal();
      } catch (error) {
        console.error("Erro ao cadastrar alien:", error);
      }
    }
  }

  return (
    <section>
      <h1>Avistamentos</h1>
      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

      <button onClick={() => setOpenModal(true)} style={{ width: "25%" }}>
        Cadastrar Avistamento
      </button>

      {loading ? (
        <p>Carregando avistamentos...</p>
      ) : (
        <p>Total de avistamentos: {avistamentos.length}</p>
      )}

      <div className="avistamento-list">
        {avistamentos.map((avistamento) => (
          <div className="avistamento-card" key={avistamento.id}>
            <h2>{avistamento.titulo}</h2>
            <p>Local: {avistamento.local}</p>
            <p>Descrição: {avistamento.descricao}</p>
            <p>Nível do medo: {avistamento.nivelMedo}</p>

            {/* eu coloquei os botoes aqui em baixo  */}
            <div className="acoes-card" style={{ marginTop: "10px" }}>
              <button
                onClick={() => abrirEdicao(avistamento)}
                style={{
                  backgroundColor: "blue",
                  margin: "4px",
                  justifyContent: "center",
                }}
              >
                Editar
              </button>
              <button
                onClick={() => deletarAvistamento(avistamento.id)}
                style={{ backgroundColor: "#dc3545", color: "white" }}
              >
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>

      {openModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            {/* Atualizei a prop para salvarAvistamento, que gerencia tanto create quanto update */}
            <FormAvistamento
              cadastrarAvistamento={salvarAvistamento}
              fecharModal={fecharModal}
              formAvistamento={payload}
              setFormAvistamento={setPayload}
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Avistamentos;
