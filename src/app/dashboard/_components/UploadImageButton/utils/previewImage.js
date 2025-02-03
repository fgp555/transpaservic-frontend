// previewImage.js
import { compressAndConvertImage } from "./compressAndConvertImage";

export async function previewImage(input, setCompressedFile) {
  const previewContainer = document.getElementById("preview");
  previewContainer.innerHTML = ""; // Limpiar la vista previa anterior

  const file = input.files[0];
  if (file) {
    const compressedFile = await compressAndConvertImage(file); // Comprimir y convertir a JPG
    setCompressedFile(compressedFile); // Actualizar el estado con el archivo comprimido
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target.result;
      img.className = "w-32 h-32 object-cover"; // Limitar el tamaño de la imagen
      previewContainer.appendChild(img);
    };

    reader.readAsDataURL(compressedFile); // Leer la imagen comprimida y convertida
  }
}
