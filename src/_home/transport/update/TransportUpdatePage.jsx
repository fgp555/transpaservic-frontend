import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { transportService } from "../../../services/apiTransport";

const TransportUpdatePage = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const navigate = useNavigate(); // Usar navigate para redirigir
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    website: "",
  });
  const [loading, setLoading] = useState(false);

  // Cargar los datos del transporte al montar el componente
  useEffect(() => {
    const fetchTransport = async () => {
      try {
        const transport = await transportService.findOne(id);
        setFormData({
          name: transport.name,
          email: transport.email,
          website: transport.website,
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el transporte", "error");
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
      Swal.fire("Éxito", "Transporte actualizado correctamente", "success");
      // navigate("/transport/list"); // Redirigir a la lista de transportes
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el transporte", "error");
      console.error("Error updating transport:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Actualizar Transporte</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="website">Sitio Web:</label>
          <input
            type="url"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? "Actualizando..." : "Actualizar"}
          </button>
          <button type="button" onClick={() => navigate("/transport/list")}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransportUpdatePage;
