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
export const apiUserService = {
  /**
   * Obtener todos los usuarios
   * @returns {Promise}
   */
  getAllUsers: async () => {
    try {
      const response = await api.get("/api/users/findAll");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  /**
   * Obtener un usuario por ID
   * @param {string} userId
   * @returns {Promise}
   */
  getUserById: async (userId) => {
    try {
      const response = await api.get(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Crear un usuario
   * @param {Object} userData
   * @returns {Promise}
   */
  createUser: async (userData) => {
    try {
      const response = await api.post("/api/users", userData);
      return response.data;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  },

  /**
   * Actualizar un usuario
   * @param {string} userId
   * @param {Object} userData
   * @returns {Promise}
   */
  updateUser: async (userId, userData) => {
    try {
      const response = await api.patch(`/api/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with ID ${userId}:`, error);
      throw error;
    }
  },

  /**
   * Eliminar un usuario
   * @param {string} userId
   * @returns {Promise}
   */
  deleteUser: async (userId) => {
    try {
      const response = await api.delete(`/api/users/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  },
};
