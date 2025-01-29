import React, { useState } from "react";
import { previewImage } from "../../utils/previewImage";

const UploadFileDev = () => {
  const [name, setName] = useState("frank");
  const [email, setEmail] = useState("user@mail.com");
  const [compressedFile, setCompressedFile] = useState(null); // Para almacenar la imagen comprimida

  // Función para manejar el cambio de la imagen
  const handleImageChange = (event) => {
    previewImage(event.target, setCompressedFile); // Comprimir y actualizar la imagen
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name || !email || !compressedFile) {
      alert("Por favor, complete todos los campos.");
      return;
    }

    const formData = new FormData();
    formData.append("profileImage", compressedFile); // Enviar la imagen comprimida
    formData.append("name", name);
    formData.append("email", email);

    try {
      const response = await fetch("http://localhost:3000/api/fileupload/profileImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Usuario creado correctamente");
        console.log(data);
      } else {
        alert("Error al crear el usuario");
        console.error(data);
      }
    } catch (error) {
      alert("Ocurrió un error al enviar los datos");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Crear Usuario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">
            Nombre
          </label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border rounded w-full" placeholder="Ingresa tu nombre" required />
        </div>

        <div>
          <label htmlFor="email" className="block">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 border rounded w-full"
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        <div>
          <label htmlFor="profileImage" className="block">
            Imagen de Perfil
          </label>
          <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} className="mt-1" required />
          {/* Contenedor de vista previa de la imagen */}
          <div id="preview" className="mt-2"></div>
        </div>

        <button type="submit" className="mt-4 bg-blue-500 text-white p-2 rounded w-full">
          Crear Usuario
        </button>
      </form>
    </div>
  );
};

export default UploadFileDev;
