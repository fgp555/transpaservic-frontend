// src\services\apiAuth.js

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

  // signup
  signup: async (userData) => {
    userData.transport.id = Number(userData.transport.id);
    console.log("userData", userData);
    try {
      const response = await api.post("/api/auth/signup", userData);
      return response.data; // Devuelve los datos en caso de éxito
    } catch (error) {
      // Extraer el mensaje de error con una estructura más flexible
      const errorMessage =
        error.response?.data?.error || // Error específico (e.g., "Email already exists")
        error.response?.data?.message || // Mensaje genérico (e.g., "Failed to create user")
        "Error desconocido al registrarse."; // Fallback genérico
      const errorStatus = error.response?.status || 500;

      console.error("Error signing up:", { message: errorMessage, status: errorStatus });

      // Lanza un error con contexto
      throw { message: errorMessage, status: errorStatus };
    }
  },

  update: async (id, userData) => {
    try {
      const response = await api.patch(`/api/auth/update/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
};
