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
export const ticketService = {
  getAll: async () => {
    try {
      const response = await api.get("/api/ticket");
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },

  create: async (ticketData) => {
    try {
      const response = await api.post("/api/ticket", ticketData);
      return response.data;
    } catch (error) {
      console.error("Error creating ticket:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/ticket/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching ticket:", error);
      throw error;
    }
  },

  update: async (id, ticketData) => {
    try {
      const response = await api.patch(`/api/ticket/${id}`, ticketData);
      return response.data;
    } catch (error) {
      console.error("Error updating ticket:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/ticket/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting ticket:", error);
      throw error;
    }
  },
};
