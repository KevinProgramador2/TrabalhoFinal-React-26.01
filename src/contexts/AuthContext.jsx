import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

//  Ele guarda no contexto:

//   token
//   nomeUsuario
//   estaAutenticado
//   carregandoToken
//   login()
//   logout()

const TOKEN_KEY = "tokenAcesso";
const USER_NAME_KEY = "nomeUsuario";

// AuthProvider envolve a aplicação e disponibiliza os dados de autenticação.
export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("");
  // Controla o carregamento inicial enquanto o app verifica se já existe token salvo.
  const [carregandoToken, setCarregandoToken] = useState(true);

  useEffect(() => {
    // Ao abrir ou recarregar o app, busca o token salvo no storage.
    function carregarToken() {
      const tokenSalvo = localStorage.getItem(TOKEN_KEY);
      const nomeSalvo = localStorage.getItem(USER_NAME_KEY);

      // Se já existir token salvo, restaura o usuário como autenticado.
      if (tokenSalvo) {
        setToken(tokenSalvo);
      }

      // Se já existir nome salvo, restaura para a interface poder mostrar.
      if (nomeSalvo) {
        setNomeUsuario(nomeSalvo);
      }

      // Depois da busca, libera as rotas para decidirem se mostram a tela ou redirecionam.
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

  // Remove o token salvo e limpa o estado de autenticação.
  function logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_NAME_KEY);
    setToken("");
    setNomeUsuario("");
  }

  // Objeto com tudo que os componentes poderão acessar pelo useAuth.
  const value = useMemo(
    () => ({
      carregandoToken,
      // Boolean(token) transforma token em true/false.
      estaAutenticado: Boolean(token),
      login,
      logout,
      nomeUsuario,
      token,
    }),
    [carregandoToken, nomeUsuario, token]
  );

  // Disponibiliza o value para todos os componentes dentro do AuthProvider.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook personalizado para acessar o contexto de autenticação com menos repetição.
export function useAuth() {
  const context = useContext(AuthContext);

  // Proteção para evitar usar useAuth fora do AuthProvider.
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider.");
  }

  return context;
}
