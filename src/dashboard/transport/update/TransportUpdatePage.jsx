import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { transportService } from "../../../services/apiTransport";
import "./TransportUpdatePage.css";

const TransportUpdatePage = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const navigate = useNavigate(); // Usar navigate para redirigir
  const [formData, setFormData] = useState({
    name: "",
    username: "", // Campo para el nombre de usuario
    whatsapp: "", // Campo para WhatsApp
    email: "",
    website: "",
    image: "", // Campo para la imagen
    registrationDate: "", // Campo para la fecha de registro
  });
  const [loading, setLoading] = useState(false);

  // Cargar los datos del Operador al montar el componente
  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const transport = await transportService.findOne(id);
        setFormData({
          name: transport.name,
          username: transport.username,
          whatsapp: transport.whatsapp,
          email: transport.email,
          website: transport.website,
          image: transport.image,
          registrationDate: transport.registrationDate,
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el Operador", "error");
        console.error("Error fetching transport:", error);
      }
    };

    fetchTransport();
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await transportService.update(id, formData);
      Swal.fire("Éxito", "Operador actualizado correctamente", "success");
      // navigate("/transport/list"); // Redirigir a la lista de Operador
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el Operador", "error");
      console.error("Error updating transport:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="TransportUpdatePage">
      <h2>Actualizar Operador</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="username">Nombre de Usuario:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="whatsapp">WhatsApp:</label>
          <input type="text" id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="website">Sitio Web:</label>
          <input type="url" id="website" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="image">Imagen (URL):</label>
          <input type="url" id="image" name="image" value={formData.image} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="registrationDate">Fecha de Registro:</label>
          <input
            type="date"
            id="registrationDate"
            name="registrationDate"
            value={formData.registrationDate}
            onChange={handleChange}
            disabled // No permitir editar la fecha de registro
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
          <br />
          {/* <button type="button" onClick={() => navigate("/dashboard/transport/list")}>
            Cancelar
          </button> */}
        </div>
      </form>
    </div>
  );
};

export default TransportUpdatePage;
