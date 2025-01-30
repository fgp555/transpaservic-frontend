// src\services\apiMunicipality.js

import { apiBaseURL } from "../utils/apiBaseURL";
import axios from "axios";

// Crear una instancia de Axios con la apiBaseURL
const api = axios.create({
  apiBaseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const municipalityService = {
  getAll: async () => {
    try {
      const response = await api.get("/api/municipality");
      return response.data;
    } catch (error) {
      console.error("Error fetching municipalities:", error);
      throw error;
    }
  },

  findOne: async (municipalityId) => {
    try {
      const response = await api.get(`/api/municipality/${municipalityId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching municipality:", error);
      throw error;
    }
  },

  create: async (municipalityData) => {
    try {
      const response = await api.post("/api/municipality", municipalityData);
      return response.data;
    } catch (error) {
      console.error("Error creating municipality:", error);
      throw error;
    }
  },

  update: async (id, municipalityData) => {
    try {
      const response = await api.patch(`/api/municipality/${id}`, municipalityData);
      return response.data;
    } catch (error) {
      console.error("Error updating municipality:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/municipality/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting municipality:", error);
      throw error;
    }
  },
};
