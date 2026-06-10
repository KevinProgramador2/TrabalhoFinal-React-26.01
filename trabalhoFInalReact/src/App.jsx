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
      {/* 
        No Vite, o React Router funciona do lado do cliente.
        O BrowserRouter fica no main.jsx envolvendo o App inteiro.
        Assim, toda a aplicacao consegue usar rotas, links e navegacao.
      */}
      <nav className="menu">
        {/* 
          Link troca a rota sem recarregar a pagina, diferente de uma tag <a>.
          Use Link quando a navegacao aparece direto na tela, como menu ou botoes de pagina.
        */}
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
        {/* <Link to="/planetas">Planetas</Link> */}


        {/*
          useNavigate permite navegar por codigo.
          Use quando a navegacao depende de uma acao, como login concluido,
          cadastro finalizado ou clique em um botao com alguma regra antes.
        */}
        {/* <button type="button" onClick={() => navigate("/aliens")}>
          Ir para Aliens
        </button> */}
      </nav>

      {/* AppRouter renderiza a pagina correspondente a rota atual da URL. */}
      <AppRouter />
    </main>
  );
}

export default App;
