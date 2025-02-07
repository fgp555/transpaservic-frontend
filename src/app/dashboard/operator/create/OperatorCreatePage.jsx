// src\_home\operator\create\OperatorCreatePage.jsx

import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { operatorService } from "../../../../services/apiOperator";
import "./OperatorCreatePage.css";
import FileUploadComp from "../../_components/FileUploadComp/FileUploadComp";
import { isDevelopment } from "../../../../utils/apiBaseURL";
import { validateOperatorForm } from "./utils/validateOperatorForm";

let dataDev;
if (isDevelopment) {
  dataDev = {
    name: "demotranport1",
    whatsapp: "33221133221",
    email: "contact@demotranport1.com",
    website: "https://demotranport1.com",
  };
} else {
  dataDev = {};
}

const OperatorCreatePage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Reiniciar error al escribir
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateOperatorForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await operatorService.create(formData);
      Swal.fire("Éxito", "Operador creado exitosamente", "success");
      console.log("Operador creado:", response);
      navigate("/dashboard/operator/list"); // Redirigir a la lista de Operador
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Hubo un error al crear el Operador";
      Swal.fire("Error", errorMessage, "error");
      console.error("Error creating operator:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="OperatorCreatePage">
      <h2>Crear Operador</h2>
      <form /* onSubmit={handleSubmit} */>
        <div>
          <label>Nombre</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Ingrese el nombre del Operador" />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>WhatsApp</label>
          <input type="text" name="whatsapp" value={formData.whatsapp} onChange={handleChange} required placeholder="Ingrese el número de WhatsApp" />
          {errors.whatsapp && <p className="error">{errors.whatsapp}</p>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Ingrese el correo electrónico" />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Sitio Web</label>
          <input type="url" name="website" value={formData.website} onChange={handleChange} required placeholder="Ingrese el sitio web" />
          {errors.website && <p className="error">{errors.website}</p>}
        </div>
        {/* <div>
          <p>Logo del Operador</p>
          <FileUploadComp />
        </div> */}
        <br />

        <div>
          <button type="button" disabled={loading} onClick={handleSubmit}>
            {loading ? "Creando..." : "Crear Operador"}
          </button>
          <br />
        </div>
      </form>
    </div>
  );
};

export default OperatorCreatePage;
