import { useEffect, useState } from "react";
import api from "../services/api";
import FormAvistamento from "../components/FormAvistamento";

function Avistamentos() {
    const [avistamentos, setAvistamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [payload, setPayload] = useState({
        "titulo": "",
        "local": "",
        "descricao": "",
        "data": "",
        "nivelMedo": 1

    });

    async function buscarAvistamentos() {
        setLoading(true);
        try {
            const resp = await api.get("/avistamentos");
            setAvistamentos(resp.data);
        } catch (error) {
            console.error("Erro ao buscar avistamentos:", error);
        }
        finally {
            setLoading(false);
        }

    }
    useEffect(() => { buscarAvistamentos() }, [])


    function limparFormulario() {
        setPayload({
            "titulo": "",
            "local": "",
            "descricao": "",
            "data": "",
            "nivelMedo": 1
        });
    }

    function fecharModal() {
        setOpenModal(false);
        limparFormulario();
    }

 async function cadastrarAvistamento(event) {
    event.preventDefault();
    
    try {
      const resposta = await api.post("/avistamentos", payload);
      setAvistamentos((listaAtual) => [...listaAtual, resposta.data]);
      limparFormulario();
      setOpenModal(false);
      
    } catch (error) {
      console.error("Erro ao cadastrar alien:", error);
     
    }
  }


    return (
        <section>
            <h1>Avistamentos</h1>
            <button onClick={() => setOpenModal(true)} style={{ width: "25%" }}>Cadastrar Avistamento</button>
            {loading ? (
                <p>Carregando avistamentos...</p>
            ) : (
                <p>Total de avistamentos: {avistamentos.length}</p>
            )}
            <div className="avistamento-list">
                {avistamentos.map((avistamento) => (
                    <div className="avistamento-card" key={avistamento.id}>
                        <h2> {avistamento.titulo}</h2>
                        <p>Local: {avistamento.local}</p>
                        <p>Descrição:{avistamento.descricao}</p>
                        <p>Nível do medo: {avistamento.nivelMedo}</p>
                    </div>
                ))}
            </div>
            {openModal &&
                <div className="modal-overlay">
                    <div className="modal-content">
                        <FormAvistamento
                            cadastrarAvistamento={cadastrarAvistamento}
                            fecharModal={fecharModal}
                            formAvistamento={payload}
                            setFormAvistamento={setPayload}
                        />
                    </div>
                </div>

            }

        </section>
    );


}
export default Avistamentos;

