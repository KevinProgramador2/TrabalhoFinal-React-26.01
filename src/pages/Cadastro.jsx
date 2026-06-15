import { useState } from "react";
import { Link, useNavigate } from "react-router";
import api from "../services/api";

function Cadastro() {
  const navigate = useNavigate();
  const [formCadastro, setFormCadastro] = useState({
    nome: "",
    email: "",
    senha: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormCadastro((formAtual) => ({
      ...formAtual,
      [name]: value,
    }));
  }

  async function cadastrarUsuario(event) {
    event.preventDefault();
    setMensagem("");
    setErro("");

    try {
      setCarregando(true);
      await api.post("/usuarios", formCadastro);
      setMensagem("Cadastro realizado com sucesso.");

      setTimeout(() => {
        navigate("/");
      }, 1200);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
      setErro("Não foi possível realizar o cadastro.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="login-page">
      <form className="login-form" onSubmit={cadastrarUsuario}>
        <h1>Cadastro</h1>

        <label>
          Nome
          <input
            autoComplete="name"
            minLength={2}
            name="nome"
            onChange={atualizarCampo}
            placeholder="Seu nome"
            required
            type="text"
            value={formCadastro.nome}
          />
        </label>

        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={atualizarCampo}
            placeholder="seu@email.com"
            required
            type="email"
            value={formCadastro.email}
          />
        </label>

        <label>
          Senha
          <input
            autoComplete="new-password"
            minLength={6}
            name="senha"
            onChange={atualizarCampo}
            placeholder="Mínimo de 6 caracteres"
            required
            type="password"
            value={formCadastro.senha}
          />
        </label>

        {mensagem && <p className="mensagem">{mensagem}</p>}
        {erro && <p className="mensagem erro">{erro}</p>}

        <button disabled={carregando} type="submit">
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </button>

        <Link className="form-link" to="/">
          Já tenho conta
        </Link>
      </form>
    </section>
  );
}

export default Cadastro;
