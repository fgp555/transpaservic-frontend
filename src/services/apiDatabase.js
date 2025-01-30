import axios from "axios";
import { apiBaseURL } from "../utils/apiBaseURL";

const apiDatabaseService = {
  // Get the list of backup files
  getBackups: async () => {
    try {
      const response = await axios.post(`${apiBaseURL}/api/database/display_backups_files`);
      //   console.log("response.data", response.data);
      return response.data.files;
    } catch (error) {
      throw new Error("Failed to fetch backups: " + error.message);
    }
  },

  // Create a Postgres backup
  createBackup: async () => {
    try {
      const response = await axios.post(`${apiBaseURL}/api/database/create_backup`);
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to create backup: " + error.message);
    }
  },

  // Download a specific backup
  downloadBackup: async (backupFileName) => {
    try {
      const response = await axios.get(`${apiBaseURL}/api/database/download/${backupFileName}`, {
        responseType: "blob", // Important for file downloads
      });
      return response.data; // The file blob data
    } catch (error) {
      throw new Error("Failed to download backup: " + error.message);
    }
  },

  // Restore a specific backup
  restoreBackup: async (backupFileName) => {
    try {
      const response = await axios.post(`${apiBaseURL}/api/database/restore/${backupFileName}`);
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to restore backup: " + error.message);
    }
  },

  // Delete a specific backup
  deleteBackup: async (backupFileName) => {
    try {
      const response = await axios.delete(`${apiBaseURL}/api/database/delete/${backupFileName}`);
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to delete backup: " + error.message);
    }
  },

  // Upload a backup file
  uploadBackup: async (file) => {
    const formData = new FormData();
    formData.append("file", file); // Append the file to the form data

    try {
      const response = await axios.post(`${apiBaseURL}/api/database/upload_backup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Set correct content type for file upload
        },
      });
      return response.data; // Assuming success response data
    } catch (error) {
      throw new Error("Failed to upload backup: " + error.message);
    }
  },
};

export default apiDatabaseService;
