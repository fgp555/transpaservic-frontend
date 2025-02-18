import "./UserRegisterPage.css";
import { authService } from "../../../../services/apiAuth";
import { operatorService } from "../../../../services/apiOperator";
import { validateUserForm } from "./userValitation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2"; // Para mostrar alertas

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [operatorData, setOperatorData] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : name === "operator" ? { id: parseInt(value) } : value,
    }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: undefined })); // Reiniciar error al escribir
  };

  const getAllTranport = async () => {
    try {
      const response = await operatorService.getAll();
      console.log("Operator data:", response); // Verifica el formato de la respuesta
      setOperatorData(response.results || []); // Asegúrate de manejar un caso donde response sea undefined o null
      // setOperatorData(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error fetching operator data:", error);
      setOperatorData([]); // Establece un arreglo vacío si ocurre un error
    }
  };

  useEffect(() => {
    getAllTranport();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateUserForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const payload = {
      ...formData,
      operator: formData.operator || null, // Si está vacío, envía null
    };

    try {
      const response = await authService.signup(payload);
      console.log("User registered successfully:", response);

      Swal.fire({
        title: "¡Usuario registrado!",
        text: "El usuario ha sido registrado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error registering user:", error);
      const errorMessage = error.message || "Hubo un error al registrar el usuario."; // Error del servicio

      Swal.fire({
        title: "Error",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  const generateRandomPassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    const passwordLength = 12; // Longitud de la contraseña
    let randomPassword = "";

    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPassword += characters[randomIndex];
    }

    return randomPassword;
  };

  const handleGeneratePassword = () => {
    const newPassword = generateRandomPassword();
    setFormData((prev) => ({
      ...prev,
      password: newPassword,
    }));

    Swal.fire({
      title: "Contraseña generada",
      text: "Se ha generado una nueva contraseña.",
      icon: "success",
      confirmButtonText: "Aceptar",
      position: "bottom-end",
      showConfirmButton: false,
      timer: 3000,
      toast: true,
      customClass: {
        popup: "swal-popup-bottom-right",
      },
    });
  };

  return (
    <div className="UserRegisterPage">
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <label htmlFor="firstName">Nombre</label>
        <input type="text" name="firstName" id="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} />
        {errors.firstName && <span className="error">{errors.firstName}</span>}

        <label htmlFor="lastName">Apellido</label>
        <input type="text" name="lastName" id="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="whatsapp">WhatsApp</label>
        <input type="text" name="whatsapp" id="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        {errors.email && <span className="error">{errors.email}</span>}

        <div className="password-fields">
          <label htmlFor="password">Contraseña</label>
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
          <span type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? (
              <i className="icon-eye"></i> // Ícono para mostrar la contraseña
            ) : (
              <i className="icon-eye-off"></i> // Ícono para ocultar la contraseña
            )}
          </span>
          <br />
          {/* Botón para generar contraseña */}
          <button type="button" onClick={handleGeneratePassword} className="btn btn-primary">
            Generar Contraseña
          </button>
          <br />
          {errors.password && <span className="error">{errors.password}</span>}

          <br />
        </div>

        {/* Select para role */}
        <label>
          Tipo de rol
          <br />
          <select name="role" value={formData.role} onChange={handleChange} className="select-role">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        {/* Select para operador */}
        <label>
          Operador
          <br />
          <select name="operator" onChange={handleChange} value={formData.operator?.id || ""}>
            <option value="">Sin Operador</option>
            {operatorData.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit" className="btn btn-primary">
          Registrar
        </button>
      </form>
    </div>
  );
};

export default UserRegisterPage;
