import React, { useState } from "react";
// import UploadImageButton from "./UploadImageButton"; // Importar el componente de botón

const UploadFileDev = () => {
  const [name, setName] = useState("frank");
  const [email, setEmail] = useState("user@mail.com");
  const [compressedFile, setCompressedFile] = useState(null); // Para almacenar la imagen comprimida

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
    <div>
      <h2>Crear Usuario</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            //
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ingresa tu nombre"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Correo Electrónico</label>
          <input
            //
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Ingresa tu correo electrónico"
            required
          />
        </div>

        {/* Usar el componente de subir imagen */}
        <UploadImageButton setCompressedFile={setCompressedFile} />

        <button type="submit">Crear Usuario</button>
      </form>
    </div>
  );
};

export default UploadFileDev;
