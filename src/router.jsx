import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "./contexts/AuthContext";
import Aliens from "./pages/Aliens";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Planetas from "./pages/Planetas";
import Avistamentos from "./pages/Avistamentos";


function RotaPrivada({ children }) {
  const { carregandoToken, estaAutenticado } = useAuth();

  if (carregandoToken) {
    return <p>Carregando...</p>;
  }

  if (!estaAutenticado) {
    return <Navigate to="/" replace />;
  }

  return children;
}

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />

      <Route
        path="/avistamentos"
        element={
          <RotaPrivada>
            <Avistamentos />
          </RotaPrivada>
        }
      />
      <Route
        path="/aliens"
        element={
          <RotaPrivada>
            <Aliens />
          </RotaPrivada>
        }
      />
      <Route
        path="/home"
        element={
          <RotaPrivada>
            <Home />
          </RotaPrivada>
        }
      />
      <Route
        path="/planetas"
        element={
          <RotaPrivada>
            <Planetas />
          </RotaPrivada>
        }
      />
      <Route path="*" element={<h1>404 - Página Não Encontrada</h1>} />
    </Routes>
  );
}

export default AppRouter;
