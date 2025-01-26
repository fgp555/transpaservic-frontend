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
  // saveFilteredData
  async saveFilteredData(data) {
    console.log("data", data);
    try {
      const response = await api.post("/api/ticket/save-filtered-data", data);
      return response.data; // En caso de éxito, devuelve los datos
    } catch (error) {
      // Asegurarse de que el error tenga la estructura esperada
      if (error.response && error.response.data) {
        // Verificamos si la respuesta tiene duplicados
        const { message, duplicates } = error.response.data;
        if (duplicates) {
          throw {
            message: message || "Se han detectado entradas duplicadas",
            duplicates: duplicates,
          };
        }
        // Si no hay duplicados, simplemente lanzamos el error con el mensaje
        throw new Error(message || "Error desconocido al guardar los datos");
      } else {
        throw new Error("Error desconocido al guardar los datos");
      }
    }
  },

  async getTickets(filters) {
    try {
      const { status, transport, page = 1, limit = 10, search, dateFrom, dateTo } = filters;

      // Construir la URL con parámetros dinámicos
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (transport) params.append("transport", transport);
      if (search) params.append("search", search);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (dateFrom) params.append("dateFrom", dateFrom); // Agregar dateFrom si existe
      if (dateTo) params.append("dateTo", dateTo); // Agregar dateTo si existe

      // Realizar la solicitud GET con los filtros
      const response = await api.get(`/api/ticket?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },

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
