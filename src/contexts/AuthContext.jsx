import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

const TOKEN_KEY = "tokenAcesso";
const USER_NAME_KEY = "nomeUsuario";

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    function carregarToken() {
      const tokenSalvo = localStorage.getItem(TOKEN_KEY);
      const nomeSalvo = localStorage.getItem(USER_NAME_KEY);

      if (tokenSalvo) {
        setToken(tokenSalvo);
      }

      if (nomeSalvo) {
        setNomeUsuario(nomeSalvo);
      }

      setCarregandoToken(false);
    }

    carregarToken();
  }, []);


  async function login({ email, senha }) {
    const resposta = await api.post("/login", { email, senha });

    const tokenAcesso = resposta.data?.tokenAcesso;
    const nome = resposta.data?.usuario?.nome || "";

    if (!tokenAcesso) {
      throw new Error("Token de acesso não retornado pela API.");
    }

    localStorage.setItem(TOKEN_KEY, tokenAcesso);

    if (nome) {
      localStorage.setItem(USER_NAME_KEY, nome);
    } else {
      localStorage.removeItem(USER_NAME_KEY);
    }

    setToken(tokenAcesso);
    setNomeUsuario(nome);

    return tokenAcesso;
  }

  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    setToken("");
    setNomeUsuario("");
  }

  const value = useMemo(
    () => ({
      carregandoToken,
      estaAutenticado: Boolean(token),
      login,
      logout,
      nomeUsuario,
      token,
    }),
    [carregandoToken, nomeUsuario, token]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
