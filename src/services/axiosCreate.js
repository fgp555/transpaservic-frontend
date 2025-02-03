import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";

// Crear una instancia de Axios con la apiBaseURL
const axiosCreate = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token antes de cada solicitud
axiosCreate.interceptors.request.use(
  (config) => {
    const userData = JSON.parse(localStorage.getItem("user"));
    const token = userData?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosCreate;
