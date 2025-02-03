import axiosCreate from "./axiosCreate";

export const operatorService = {
  getAll: async (search = "", page = 1, limit = 0) => {
    try {
      const response = await axiosCreate.get("/api/operator", {
        params: { search, page, limit },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching operator data:", error);
      throw error;
    }
  },

  findOne: async (operatorId) => {
    try {
      const response = await axiosCreate.get(`/api/operator/${operatorId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching operator:", error);
      throw error;
    }
  },

  create: async (operatorData) => {
    try {
      const response = await axiosCreate.post("/api/operator", operatorData);
      return response.data;
    } catch (error) {
      console.error("Error creating operator:", error);
      throw error;
    }
  },

  update: async (id, operatorData) => {
    try {
      const response = await axiosCreate.patch(`/api/operator/${id}`, operatorData);
      return response.data;
    } catch (error) {
      console.error("Error updating operator:", error);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const response = await axiosCreate.delete(`/api/operator/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting operator:", error);
      throw error;
    }
  },

  findByName: async (name) => {
    try {
      const response = await axiosCreate.get(`/api/operator/findByName/${name}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching operator by name:", error);
      throw error;
    }
  },
};
