import axiosCreate from "./axiosCreate";

export const authPasswordService = {
  // Servicio para solicitar un restablecimiento de contraseña
  async forgotPassword(email, domain) {
    try {
      const response = await axiosCreate.post("/api/auth/forgotPassword", {
        email,
        domain,
      });
      return response.data;
    } catch (error) {
      console.error("Error al solicitar restablecimiento de contraseña:", error);
      throw new Error(error.response?.data?.message || "Error en la solicitud de restablecimiento de contraseña");
    }
  },

  // Servicio para restablecer la contraseña con el token recibido
  async restorePassword(emailEncrypt, newPassword) {
    try {
      const response = await axiosCreate.post("/api/auth/restorePassword", {
        emailEncrypt,
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error al restablecer la contraseña:", error);
      throw new Error(error.response?.data?.message || "Error al restablecer la contraseña");
    }
  },
};
