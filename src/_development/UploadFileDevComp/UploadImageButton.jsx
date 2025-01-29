// UploadImageButton.js
import React from "react";
import { previewImage } from "../../utils/previewImage";

const UploadImageButton = ({ setCompressedFile }) => {
  const handleImageChange = (event) => {
    previewImage(event.target, setCompressedFile); // Comprimir y actualizar la imagen
  };

  return (
    <div>
      <label htmlFor="profileImage" className="block">
        Imagen de Perfil
      </label>
      <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} className="mt-1" required />
      {/* Contenedor de vista previa de la imagen */}
      <div id="preview" className="mt-2"></div>
    </div>
  );
};

export default UploadImageButton;
