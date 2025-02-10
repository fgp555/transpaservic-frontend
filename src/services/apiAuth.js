import axiosCreate from "./axiosCreate";

export const authService = {
  // refreshAccessToken
  async refreshAccessToken() {
    try {
      const response = await axiosCreate.post("/api/auth/token/refresh");
      return response.data;
    } catch (error) {
      console.error("Error refreshing access token:", error);
      throw error;
    }
  },

  // Login
  async signin(userData) {
    try {
      const response = await axiosCreate.post("/api/auth/signin", userData);
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  },

  // Registro de usuario (Signup)
  async signup(userData) {
    console.log("userData", userData);
    if (userData.operator) {
      userData.operator.id = Number(userData.operator.id);
    }
    try {
      const response = await axiosCreate.post("/api/auth/signup", userData);
      return response.data;
    } catch (error) {
      // Extraer el mensaje de error con una estructura más flexible
      const errorMessage = error.response?.data?.error || error.response?.data?.message || "Error desconocido al registrarse.";
      const errorStatus = error.response?.status || 500;

      console.error("Error signing up:", { message: errorMessage, status: errorStatus });

      throw { message: errorMessage, status: errorStatus };
    }
  },

  // Actualización de usuario
  async update(id, userData) {
    console.log("userData", userData);
    try {
      const response = await axiosCreate.patch(`/api/auth/update/${id}`, userData);
      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  },
};
