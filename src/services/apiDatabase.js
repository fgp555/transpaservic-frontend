import axiosCreate from "./axiosCreate";

const apiDatabaseService = {
  // Obtener la lista de archivos de respaldo
  getBackups: async () => {
    try {
      const response = await axiosCreate.post("/api/database/display_backups_files");
      return response.data.files;
    } catch (error) {
      throw new Error("Failed to fetch backups: " + error.message);
    }
  },

  // Crear un respaldo de Postgres
  createBackup: async () => {
    try {
      const response = await axiosCreate.post("/api/database/create_backup");
      return response.data;
    } catch (error) {
      throw new Error("Failed to create backup: " + error.message);
    }
  },

  // Descargar un respaldo específico
  downloadBackup: async (backupFileName) => {
    try {
      const response = await axiosCreate.get(`/api/database/download/${backupFileName}`, {
        responseType: "blob", // Importante para la descarga de archivos
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to download backup: " + error.message);
    }
  },

  // Restaurar un respaldo específico
  restoreBackup: async (backupFileName) => {
    try {
      const response = await axiosCreate.post(`/api/database/restore/${backupFileName}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to restore backup: " + error.message);
    }
  },

  // Eliminar un respaldo específico
  deleteBackup: async (backupFileName) => {
    try {
      const response = await axiosCreate.delete(`/api/database/delete/${backupFileName}`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to delete backup: " + error.message);
    }
  },

  // Subir un archivo de respaldo
  uploadBackup: async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axiosCreate.post("/api/database/upload_backup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      throw new Error("Failed to upload backup: " + error.message);
    }
  },
};

export default apiDatabaseService;
