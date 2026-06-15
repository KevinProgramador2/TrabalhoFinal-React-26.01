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
    navigate("/");
  }

  function toggleTheme() {
    const novoTema = dark ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", novoTema);
    setDark(!dark);
  }

  return (
    <main className="app">
      <nav
        className={`sidebar ${menuAberto ? "sidebar-aberta" : ""}`}
        onMouseEnter={() => setMenuAberto(true)}
        onMouseLeave={() => setMenuAberto(false)}
      >
        <div className="sidebar-icone">☰</div>
        <div className="sidebar-links">
          <Link to="/">🔑Login</Link>
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
              <Link to="/cadastro">📝 Cadastro</Link>
            </>
          )}
        </div>
      </nav>

      <AppRouter />

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
