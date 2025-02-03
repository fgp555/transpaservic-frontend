// UploadImageButton.js
import React from "react";
import "./UploadImageButton.css";
import { previewImage } from "./utils/previewImage";

const UploadImageButton = ({ setCompressedFile }) => {
  const handleImageChange = (event) => {
    previewImage(event.target, setCompressedFile); // Comprimir y actualizar la imagen
  };

  return (
    <div className="UploadImageButton  ">
      <label htmlFor="profileImage" className="btn btn-primary mb-1">
        Seleccionar imagen
      </label>
      <input
        //
        type="file"
        id="profileImage"
        accept="image/*"
        onChange={handleImageChange}
        required
        hidden
      />

      {/* Contenedor de vista previa de la imagen */}
      <div id="preview"></div>
    </div>
  );
};

export default UploadImageButton;
