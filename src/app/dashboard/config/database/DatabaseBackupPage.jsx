import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import apiDatabaseService from "../../../../services/apiDatabase";
import "./DatabaseBackupPage.css";

const DatabaseBackupPage = () => {
  const [backups, setBackups] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null); // State for selected file
  const [fileName, setFileName] = useState(""); // State to store the file name

  useEffect(() => {
    // Fetch backups when the component mounts
    const fetchBackups = async () => {
      try {
        setIsLoading(true);
        const data = await apiDatabaseService.getBackups();
        setBackups(data);
      } catch (err) {
        setError("Failed to fetch backups");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBackups();
  }, []);

  const handleCreateBackup = async () => {
    const confirmCreate = await Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres crear una nueva copia de seguridad?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, crear",
      cancelButtonText: "Cancelar",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmCreate.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiDatabaseService.createBackup();
      setError(null);

      Swal.fire({
        title: "¡Éxito!",
        text: "La copia de seguridad se ha creado correctamente.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      // Añadir un pequeño retraso para asegurar que la nueva copia de seguridad se haya creado en el backend
      setTimeout(async () => {
        const data = await apiDatabaseService.getBackups();
        setBackups(data); // Refrescar la lista de copias de seguridad
      }, 1000); // Retraso de 1 segundo para permitir el procesamiento en el backend
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "No se pudo crear la copia de seguridad.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      setError("No se pudo crear la copia de seguridad");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadBackup = async (backupFileName) => {
    const confirmDownload = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres descargar la copia de seguridad "${backupFileName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, descargar",
      cancelButtonText: "Cancelar",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmDownload.isConfirmed) return;

    try {
      const fileData = await apiDatabaseService.downloadBackup(backupFileName);
      // Crear un enlace y activar la descarga del archivo
      const link = document.createElement("a");
      link.href = URL.createObjectURL(fileData);
      link.download = backupFileName;
      link.click();

      Swal.fire({
        title: "¡Éxito!",
        text: `La copia de seguridad "${backupFileName}" se ha descargado correctamente.`,
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `No se pudo descargar la copia de seguridad "${backupFileName}".`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      setError("No se pudo descargar la copia de seguridad");
    }
  };

  const handleRestoreBackup = async (backupFileName) => {
    const confirmRestore = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Quieres restaurar la copia de seguridad "${backupFileName}"? Esto sobrescribirá los datos actuales.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, restaurar",
      cancelButtonText: "Cancelar",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmRestore.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiDatabaseService.restoreBackup(backupFileName);
      const data = await apiDatabaseService.getBackups(); // Refrescar lista de copias de seguridad
      setBackups(data);

      Swal.fire({
        title: "¡Éxito!",
        text: `La copia de seguridad "${backupFileName}" se ha restaurado correctamente.`,
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: `No se pudo restaurar la copia de seguridad "${backupFileName}".`,
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      setError("No se pudo restaurar la copia de seguridad");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteBackup = async (backupFileName) => {
    const confirmDelete = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Estás a punto de eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiDatabaseService.deleteBackup(backupFileName);
      const data = await apiDatabaseService.getBackups(); // Refrescar lista de copias de seguridad

      Swal.fire({
        title: "¡Eliminado!",
        text: "La copia de seguridad se ha eliminado correctamente.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });

      setBackups(data);
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: error.message || "No se pudo eliminar la copia de seguridad.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      setError("No se pudo eliminar la copia de seguridad");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the selected file
    setFile(selectedFile); // Set the selected file to state
    setFileName(selectedFile.name); // Set the file name
  };

  const handleUploadBackup = async (event) => {
    event.preventDefault(); // Prevenir el envío predeterminado del formulario
    if (!file) {
      Swal.fire({
        title: "Error",
        text: "Por favor selecciona un archivo para subir.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      return;
    }

    const confirmUpload = await Swal.fire({
      title: "¿Estás seguro?",
      text: `¿Deseas subir el archivo de copia de seguridad seleccionado?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#5e63ff",
      confirmButtonText: "Sí, subir",
      cancelButtonText: "Cancelar",
      background: "#222533", // Color de fondo oscuro
      color: "#fff", // Color del texto en el modal
      customClass: {
        popup: "swal-dark-modal", // Clase personalizada para el popup
      },
    });

    if (!confirmUpload.isConfirmed) return;

    try {
      setIsLoading(true);
      await apiDatabaseService.uploadBackup(file); // Subir el archivo seleccionado
      setError(null);
      setFile(null); // Limpiar el archivo después de una carga exitosa
      setFileName(""); // Limpiar el nombre del archivo después de subirlo

      const data = await apiDatabaseService.getBackups();
      setBackups(data);

      Swal.fire({
        title: "¡Éxito!",
        text: "La copia de seguridad se ha restaurado correctamente.",
        icon: "success",
        confirmButtonColor: "#28a745",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
    } catch (err) {
      Swal.fire({
        title: "Error",
        text: "No se pudo subir el archivo de copia de seguridad.",
        icon: "error",
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Entendido",
        background: "#222533", // Color de fondo oscuro
        color: "#fff", // Color del texto en el modal
        customClass: {
          popup: "swal-dark-modal", // Clase personalizada para el popup
        },
      });
      setError("No se pudo subir la copia de seguridad");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="DatabaseBackupPage">
      <h1>Base de Datos</h1>
      <br />
      <section>
        {isLoading && <p>Cargando...</p>}

        <h2>Crear Copia de Seguridad</h2>
        <p>Las copias de seguridad se realizan de manera diaria, manteniendo únicamente las 7 copias más recientes.</p>
        <br />
        {error && <p className="error">{error}</p>}
        <button onClick={handleCreateBackup}>Crear Copia de Seguridad</button>
      </section>

      <section>
        <h3>Copias de Seguridad Existentes:</h3>
        <ul>
          {backups.length === 0 ? (
            <p>No hay copias de seguridad disponibles</p>
          ) : (
            backups.map((backup) => (
              <li key={backup}>
                <span>{backup}</span>
                <article className="hide_on_mobile">
                  <button onClick={() => handleDownloadBackup(backup)} title="Descargar">
                    <i className="icon-download"></i>
                  </button>
                  <button onClick={() => handleRestoreBackup(backup)} title="Restaurar">
                    <i className="icon-reload"></i>
                  </button>
                  <button className="danger" onClick={() => handleDeleteBackup(backup)} title="Eliminar">
                    <i className="icon-trash"></i>
                  </button>
                </article>
              </li>
            ))
          )}
        </ul>
      </section>

      <section>
        <h2>Cargar Copia de Seguridad</h2>
        {/* Formulario de carga de archivo */}
        <form onSubmit={handleUploadBackup}>
          <input type="file" id="fileInput" onChange={handleFileChange} style={{ display: "none" }} />
          <label htmlFor="fileInput" className="file-label">
            Elegir Archivo
          </label>
          <button type="submit">
            <i className="icon-upload"></i>
          </button>
        </form>

        {/* Mostrar el nombre del archivo seleccionado si se ha seleccionado un archivo */}
        {fileName && (
          <p>
            Archivo seleccionado: <strong>{fileName}</strong>
          </p>
        )}
      </section>
    </div>
  );
};

export default DatabaseBackupPage;
