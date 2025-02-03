import axiosCreate from "./axiosCreate";

export const apiUserService = {
  async getAllUsers(filters) {
    try {
      const { operator, role, page = 1, limit = 10, search } = filters;

      // Construir la URL con parámetros dinámicos
      const params = new URLSearchParams();

      if (operator) params.append("operator", operator);
      if (role) params.append("role", role);
      if (search) params.append("search", search);
      if (page) params.append("page", page);
      if (limit) params.append("limit", limit);

      // Realizar la solicitud GET con los filtros
      const response = await axiosCreate.get(`/api/users/findAll?${params.toString()}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const response = await axiosCreate.get(`/api/users/findOne/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with ID ${userId}:`, error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      const response = await axiosCreate.delete(`/api/users/Delete/${userId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting user with ID ${userId}:`, error);
      throw error;
    }
  },
};
