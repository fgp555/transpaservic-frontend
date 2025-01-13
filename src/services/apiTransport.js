// src\services\apiTransport.js

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
export const transportService = {
  getAll: async () => {
    try {
      const response = await api.get("/api/transport");
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  findOne: async (transportId) => {
    try {
      const response = await api.get("/api/transport/" + transportId);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};
