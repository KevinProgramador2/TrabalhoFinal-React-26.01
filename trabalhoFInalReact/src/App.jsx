import { Link, useNavigate } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import AppRouter from "./router";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const { estaAutenticado, logout } = useAuth();
  const [menuAberto, setMenuAberto] = useState(false);
  const [dark, setDark] = useState(false);

  async function sair() {
    await logout();
    navigate("/login");
  }

  function toggleTheme() {
    const novoTema = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novoTema);
    setDark(!dark);
  }

  return (
    <main className="app">
      {/* 
        No Vite, o React Router funciona do lado do cliente.
        O BrowserRouter fica no main.jsx envolvendo o App inteiro.
        Assim, toda a aplicacao consegue usar rotas, links e navegacao.
      */}

      {/* Sidebar */}
      <nav
        className={`sidebar ${menuAberto ? "sidebar-aberta" : ""}`}
        onMouseEnter={() => setMenuAberto(true)}
        onMouseLeave={() => setMenuAberto(false)}
      >
        <div className="sidebar-icone">☰</div>
        <div className="sidebar-links">
          {/* 
            Link troca a rota sem recarregar a pagina, diferente de uma tag <a>.
            Use Link quando a navegacao aparece direto na tela, como menu ou botoes de pagina.
          */}
          <Link to="/">🏠 Home</Link>
          {estaAutenticado && (
            <>
              <Link to="/aliens">👽 Aliens</Link>
              <Link to="/planetas">🪐 Planetas</Link>
              <Link to="/avistamentos">🛸 Avistamentos</Link>
            </>
          )}
          {estaAutenticado ? (
            <button className="menu-button" type="button" onClick={sair}>
              🚪 Sair
            </button>
          ) : (
            <>
              <Link to="/login">🔑 Login</Link>
              <Link to="/cadastro">📝 Cadastro</Link>
            </>
          )}
          {/* <Link to="/planetas">Planetas</Link> */}

          {/*
            useNavigate permite navegar por codigo.
            Use quando a navegacao depende de uma acao, como login concluido,
            cadastro finalizado ou clique em um botao com alguma regra antes.
          */}
          {/* <button type="button" onClick={() => navigate("/aliens")}>
            Ir para Aliens
          </button> */}
        </div>
      </nav>

      {/* AppRouter renderiza a pagina correspondente a rota atual da URL. */}
      <AppRouter />

      {/* Botão tema flutuante */}
      <button
        type="button"
        onClick={toggleTheme}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          background: "#2176ff",
          color: "#ffffff",
          border: "none",
          fontSize: "20px",
          cursor: "pointer",
          zIndex: 999,
        }}
      >
        {dark ? "☀️" : "🌙"}
      </button>
    </main>
  );
}

export default App;