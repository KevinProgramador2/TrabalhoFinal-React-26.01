import axios from "axios";

const api = axios.create({
  baseURL: "https://api.serratec.mwmsoftware.com",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("tokenAcesso");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
