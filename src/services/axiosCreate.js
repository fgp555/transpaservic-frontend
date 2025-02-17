import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";

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

// Interceptor para manejar errores
axiosCreate.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && [401, 403].includes(error.response.status)) {
      // Evitar la redirección si el usuario ya está en "/"
      if (window.location.pathname !== "/") {
        localStorage.removeItem("user"); // Opcional: limpiar datos de usuario
        window.location.href = "/"; // Redirigir a la home
      }
    }
    return Promise.reject(error);
  }
);

export default axiosCreate;
