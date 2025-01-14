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

  create: async (transportData) => {
    try {
      const response = await api.post("/api/transport", transportData);
      return response.data;
    } catch (error) {
      console.error("Error creating transport:", error);
      throw error;
    }
  },

  update: async (id, transportData) => {
    try {
      const response = await api.patch(`/api/transport/${id}`, transportData);
      return response.data;
    } catch (error) {
      console.error("Error updating transport:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/transport/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting transport:", error);
      throw error;
    }
  },
};
