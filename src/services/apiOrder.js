import { apiBaseURL } from "../utils/apiBaseURL";
import axios from "axios";

// Crear una instancia de Axios con la apiBaseURL
const api = axios.create({
  apiBaseURL: apiBaseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Implementación del servicio
export const orderService = {
  // saveFilteredData
  async saveFilteredData(data) {
    console.log("data", data);
    try {
      const response = await api.post("/api/order/save-filtered-data", data);
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

  async getOrders(filters) {
    try {
      const { status, operator, page = 1, limit = 10, search, dateFrom, dateTo } = filters;

      // Construir la URL con parámetros dinámicos
      const params = new URLSearchParams();

      if (status) params.append("status", status);
      if (operator) params.append("operator", operator);
      if (search) params.append("search", search);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);
      if (dateFrom) params.append("dateFrom", dateFrom); // Agregar dateFrom si existe
      if (dateTo) params.append("dateTo", dateTo); // Agregar dateTo si existe

      // Realizar la solicitud GET con los filtros
      const response = await api.get(`/api/order?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await api.get("/api/order");
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
  },

  create: async (orderData) => {
    try {
      const response = await api.post("/api/order", orderData);
      return response.data;
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const response = await api.get(`/api/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching order:", error);
      throw error;
    }
  },

  update: async (id, orderData) => {
    try {
      const response = await api.patch(`/api/order/${id}`, orderData);
      return response.data;
    } catch (error) {
      console.error("Error updating order:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await api.delete(`/api/order/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting order:", error);
      throw error;
    }
  },
};
