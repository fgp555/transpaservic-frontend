import { baseURL } from "./baseURL";
import axios from "axios";


// Crear una instancia de Axios con la baseURL
const api = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Implementación del servicio
export const authService = {
  // login
  signin: async (userData) => {
    try {
      const response = await api.post("/api/auth/signin", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};
