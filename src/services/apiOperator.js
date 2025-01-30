// src\services\apiOperator.js

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
export const operatorService = {
  getAll: async (search = "", page = 1, limit = 0) => {
    try {
      const response = await api.get("/api/operator", {
        params: {
          search,
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching operator data:", error);
      throw error;
    }
  },

  findOne: async (operatorId) => {
    try {
      const response = await api.get("/api/operator/" + operatorId);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  create: async (operatorData) => {
    try {
      const response = await api.post("/api/operator", operatorData);
      return response.data;
    } catch (error) {
      console.error("Error creating operator:", error);
      throw error;
    }
  },

  update: async (id, operatorData) => {
    try {
      const response = await api.patch(`/api/operator/${id}`, operatorData);
      return response.data;
    } catch (error) {
      console.error("Error updating operator:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/operator/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting operator:", error);
      throw error;
    }
  },

  findByName: async (name) => {
    try {
      const response = await api.get("/api/operator/findByName/" + name);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },
};
