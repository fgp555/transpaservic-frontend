import "./OperatorUpdatePage.css";
import { operatorService } from "../../../../services/apiOperator";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const OperatorUpdatePage = () => {
  const { id } = useParams(); // Obtener el ID desde la URL
  const navigate = useNavigate(); // Usar navigate para redirigir
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "", // Campo para WhatsApp
    email: "",
    website: "",
    image: "", // Campo para la imagen
    registrationDate: "", // Campo para la fecha de registro
  });
  const [loading, setLoading] = useState(false);

  // Cargar los datos del Operador al montar el componente
  useEffect(() => {
    const fetchOperator = async () => {
      try {
        const operator = await operatorService.findOne(id);
        setFormData({
          name: operator.name,
          whatsapp: operator.whatsapp,
          email: operator.email,
          website: operator.website,
          image: operator.image,
          registrationDate: operator.registrationDate,
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo cargar el Operador", "error");
        console.error("Error fetching operator:", error);
      }
    };

    fetchOperator();
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
      await operatorService.update(id, formData);
      Swal.fire("Éxito", "Operador actualizado correctamente", "success");
      // navigate("/operator/list"); // Redirigir a la lista de Operador
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el Operador", "error");
      console.error("Error updating operator:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="OperatorUpdatePage">
      <h2 className="title">Actualizar Operador</h2>
      <br />
      <form onSubmit={handleSubmit} className="dashboard">
        <aside>
          <div>
            <label htmlFor="name">Nombre:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
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
          <br />
          <div>
            <button type="submit" disabled={loading} className="btn btn-primary">
              {loading ? "Actualizando..." : "Actualizar"}
            </button>
            <br />
          </div>
        </aside>
      </form>
    </div>
  );
};

export default OperatorUpdatePage;
