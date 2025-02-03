// compressAndConvertImage.js

export async function compressAndConvertImage(file, maxWidth = 1000, quality = 0.7) {
  return new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    // Leer el archivo como Data URL
    reader.onload = () => {
      img.src = reader.result;
    };

    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;

      // Redimensionar si el ancho excede el máximo
      if (width > maxWidth) {
        height = (maxWidth / width) * height;
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);

      // Convertir la imagen a JPG y comprimirla
      canvas.toBlob((blob) => resolve(new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), { type: "image/jpeg" })), "image/jpeg", quality);
    };
  });
}
