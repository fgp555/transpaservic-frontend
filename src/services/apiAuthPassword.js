// src/services/apiAuthPassword.js

import { apiBaseURL } from "../utils/apiBaseURL";
import axios from "axios";

// Crear una instancia de Axios con la apiBaseURL
const api = axios.create({
  baseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Implementación del servicio
export const authPasswordService = {
  // Servicio para solicitar un restablecimiento de contraseña
  forgotPassword: async (email, domain) => {
    try {
      const response = await api.post("/api/auth/forgotPassword", {
        email: email, // Usamos la variable 'email' pasada como parámetro
        domain: domain, // Usamos la variable 'domain' pasada como parámetro
      });

      return response.data; // Devuelve la respuesta del servidor si es exitosa
    } catch (error) {
      console.error("Error al solicitar restablecimiento de contraseña:", error);

      // Si el error tiene una respuesta del servidor, propágalo
      if (error.response) {
        throw new Error(error.response.data.message || "Error desconocido");
      }

      // Si no tiene respuesta del servidor, lanzamos un error general
      throw new Error("Error en la solicitud de restablecimiento de contraseña");
    }
  },

  // Servicio para restablecer la contraseña con el token recibido
  restorePassword: async (emailEncrypt, newPassword) => {
    console.log("restorePassword", emailEncrypt, newPassword);
    // return
    try {
      const response = await api.post("/api/auth/restorePassword", {
        emailEncrypt,
        newPassword,
      });

      return response.data; // Devuelve la respuesta del servidor si es exitosa
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      throw new Error("Error al restablecer la contraseña"); // Lanza el error
    }
  },
};
