import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formLogin, setFormLogin] = useState({
    email: "",
    senha: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  function atualizarCampo(event) {
    const { name, value } = event.target;

    setFormLogin((formAtual) => ({
      ...formAtual,
      [name]: value,
    }));
  }

  async function enviarLogin(event) {
    event.preventDefault();
    setMensagem("");

    try {
      setCarregando(true);
      await login(formLogin);
      navigate("/home");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setMensagem("Email ou senha inválidos.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <section className="login-page">
      <form className="login-form" onSubmit={enviarLogin}>
        <h1>Login</h1>

        <label>
          Email
          <input
            autoComplete="email"
            name="email"
            onChange={atualizarCampo}
            placeholder="seu@email.com"
            required
            type="email"
            value={formLogin.email}
          />
        </label>

        <label>
          Senha
          <input
            autoComplete="current-password"
            name="senha"
            onChange={atualizarCampo}
            placeholder="Digite sua senha"
            required
            type="password"
            value={formLogin.senha}
          />
        </label>

        {mensagem && <p className="mensagem erro">{mensagem}</p>}

        <button disabled={carregando} type="submit">
          {carregando ? "Entrando..." : "Entrar"}
        </button>

        <Link className="form-link" to="/cadastro">
          Criar uma conta
        </Link>
      </form>
    </section>
  );
}

export default Login;
