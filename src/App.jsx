import { Link, useNavigate } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import AppRouter from "./router";

function App() {
  const navigate = useNavigate();
  const { estaAutenticado, logout } = useAuth();

  async function sair() {
    await logout();
    navigate("/login");
  }

  return (
    <main className="app">
      <nav className="menu">
        <Link to="/">Home</Link>
        {estaAutenticado && (
          <>
            <Link to="/aliens">Aliens</Link>
            <Link to="/planetas">Planetas</Link>
            <Link to="/avistamentos">Avistamentos</Link>
          </>
        )}
        {estaAutenticado ? (
          <button className="menu-button" type="button" onClick={sair}>
            Sair
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/cadastro">Cadastro</Link>
          </>
        )}
      </nav>

      <AppRouter />
    </main>
  );
}

export default App;
