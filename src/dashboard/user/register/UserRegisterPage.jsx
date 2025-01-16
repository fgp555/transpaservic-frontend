// src\_home\user\register\UserRegisterPage.jsx

import React, { useEffect, useState } from "react";
import { authService } from "../../../services/apiAuth";
import "./UserRegisterPage.css";
import { transportService } from "../../../services/apiTransport";
import Swal from "sweetalert2"; // Para mostrar alertas

const UserRegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "firstName 1",
    lastName: "lastName 1",
    whatsapp: "999999999",
    username: "username1",
    email: "user2@mail.com",
    password: "user2@mail.com",
    role: "user",
    sendMail: false,
    sendWhatsApp: false,
    image: "https://via.placeholder.com/150",
    transport: { id: 1 },
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [transportData, setTransportData] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const getAllTranport = async () => {
    const response = await transportService.getAll();
    setTransportData(response);
  };

  useEffect(() => {
    getAllTranport();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await authService.signup(formData);
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
      icon: "info",
      confirmButtonText: "Aceptar",
    });
  };

  return (
    <div className="UserRegisterPage">
      <form onSubmit={handleSubmit}>
        <h2>Registro de Usuario</h2>

        <input type="text" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} />
        <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />
        <input type="text" name="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />
        <input type="text" name="username" placeholder="Usuario" value={formData.username} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />

        <div className="password-fields">
          {/* <label htmlFor="password">Contraseña</label> */}
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {/* {showPassword ? "Ocultar" : "Mostrar"} */}
            {showPassword ? (
              <i className="icon-eye"></i> // Ícono para mostrar la contraseña
            ) : (
              <i className="icon-eye-off"></i> // Ícono para ocultar la contraseña
            )}
          </button>
          <br />
          {/* Botón para generar contraseña */}
          <button type="button" onClick={handleGeneratePassword} className="generate-password">
            Generar Contraseña
          </button>
          <br />
          <br />
        </div>

        {/* Select para role */}
        <label>
          Tipo de usuario
          <br />
          <select name="role" value={formData.role} onChange={handleChange} className="select-role">
            <option value="user">Usuario</option>
            <option value="admin">Administrador</option>
          </select>
        </label>

        {/* Select para transporte */}
        <label>
          Operador
          <br />
          <select name="transport" value={formData.transport.id} onChange={(e) => setFormData({ ...formData, transport: { id: e.target.value } })} className="select-transport">
            {transportData?.results?.map((transport) => (
              <option key={transport.id} value={transport.id}>
                {transport.name}
              </option>
            ))}
          </select>
        </label>

        <button type="submit">Registrar</button>
        {/* <pre>{JSON.stringify(formData, null, 3)}</pre> */}
      </form>
    </div>
  );
};

export default UserRegisterPage;
