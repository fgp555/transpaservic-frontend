// UploadImageButton.js
import React from "react";
import { previewImage } from "../../utils/previewImage";
import "./UploadImageButton.css";

const UploadImageButton = ({ setCompressedFile }) => {
  const handleImageChange = (event) => {
    previewImage(event.target, setCompressedFile); // Comprimir y actualizar la imagen
  };

  return (
    <div className="UploadImageButton">
      <form>
        <label htmlFor="profileImage" className="btn btn-primary">
          Seleccionar imagen
        </label>
        <br />
        <input
          //
          type="file"
          id="profileImage"
          accept="image/*"
          onChange={handleImageChange}
          required
          hidden
        />
      </form>

      {/* Contenedor de vista previa de la imagen */}
      <div id="preview"></div>
    </div>
  );
};

export default UploadImageButton;
