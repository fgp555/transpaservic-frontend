import React, { useState } from "react";
import "./FileUploadComp.css";

const FileUploadComp = () => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  const [preview, setPreview] = useState(null); // Estado para la URL de la previsualización

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return; // Si no se selecciona ningún archivo, salir de la función

    setIsLoading(true); // Iniciar el estado de carga

    // Crear una URL para la previsualización del archivo
    const filePreviewUrl = URL.createObjectURL(file);
    setPreview(filePreviewUrl);

    // Simular un tiempo de carga (opcional)
    setTimeout(() => {
      setIsLoading(false); // Finalizar el estado de carga
    }, 1000);
  };

  return (
    <div className="file-upload">
      <label htmlFor="file-input" className="btn btn-primary">
        {isLoading ? "Cargando..." : "Seleccionar imagen"}
      </label>
      <input id="file-input" type="file" accept="image/png, image/jpeg, image/jpg, image/gif" onChange={handleFileUpload} hidden />
      {isLoading && <div className="loading-spinner">Cargando...</div>}
      {preview && (
        <div className="image-preview">
          <img src={preview} alt="Preview" className="preview-img" />
        </div>
      )}
      <p style={{ color: "lightgreen" }}>⬆️ ⛏️ en desarrolo ✂️ ⬆️</p>
    </div>
  );
};

export default FileUploadComp;
