// src\_home\transport\create\TransportCreatePage.jsx

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { transportService } from "../../../services/apiTransport";

const TransportCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "demotranport1",
    username: "demotranport1",
    whatsapp: "33221133221",
    email: "contact@demotranport1.com",
    website: "https://demotranport1.com",
  });
  const [loading, setLoading] = useState(false);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await transportService.create(formData);
      Swal.fire("Éxito", "Transporte creado exitosamente", "success");
      console.log("Transporte creado:", response);
      // navigate("/transport/list"); // Redirigir a la lista de transportes
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Hubo un error al crear el transporte";
      Swal.fire("Error", errorMessage, "error");
      console.error("Error creating transport:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Crear Transporte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Ingrese el nombre del transporte" />
        </div>
        <div>
          <label>username</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required placeholder="Ingrese el usuario del transporte" />
        </div>
        <div>
          <label>WhatsApp</label>
          <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="Ingrese el número de WhatsApp" />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Ingrese el correo electrónico" />
        </div>
        <div>
          <label>Sitio Web</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} required placeholder="Ingrese el sitio web" />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Creando..." : "Crear Transporte"}
          </button>
          <button type="button" onClick={() => navigate("/transport/list")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransportCreatePage;
