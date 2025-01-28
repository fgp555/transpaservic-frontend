import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { authService } from "../../../../services/apiAuth";
import { transportService } from "../../../../services/apiTransport";
import Swal from "sweetalert2"; // Para mostrar alertas
import { apiUserService } from "../../../../services/apiUser";
import "./UserUpdatePage.css";
import FileUploadComp from "../../_components/FileUploadComp/FileUploadComp";

const UserUpdatePage = () => {
  const { id } = useParams(); // Obtener el id del usuario de la URL
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    whatsapp: "",
    username: "",
    email: "",
    password: "",
    role: "user",
    image: "",
    transport: { id: 1 },
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar contraseña
  const [transportData, setTransportData] = useState([]); // Datos de transporte

  // Cargar los datos de transporte disponibles
  const getAllTransport = async () => {
    try {
      const response = await transportService.getAll();
      setTransportData(response);
    } catch (error) {
      console.error("Error al obtener los transportes:", error);
    }
  };

  // Cargar el usuario a actualizar
  const getUser = async () => {
    try {
      // Aquí deberías hacer la petición para obtener el usuario por ID
      const userData = await apiUserService.getUserById(id);
      setFormData(userData);
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
    }
  };

  useEffect(() => {
    getAllTransport(); // Cargar los transportes
    getUser(); // Obtener el usuario
  }, [id]);

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Enviar el formulario de actualización
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.update(id, formData);
      console.log("Usuario actualizado exitosamente:", response);

      Swal.fire({
        title: "¡Usuario actualizado!",
        text: "El usuario ha sido actualizado con éxito.",
        icon: "success",
        confirmButtonText: "Aceptar",
      });
    } catch (error) {
      console.error("Error actualizando el usuario:", error);
      Swal.fire({
        title: "Error",
        text: "Hubo un error al actualizar el usuario. Inténtalo nuevamente.",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  };

  // Generar una contraseña aleatoria
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
    <div className="UserUpdatePage">
      <form onSubmit={handleSubmit}>
        <h2>Actualizar Usuario</h2>

        <label htmlFor="firstName">Nombre</label>
        <input type="text" name="firstName" id="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} />

        <label htmlFor="lastName">Apellido</label>
        <input type="text" name="lastName" id="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} />

        <label htmlFor="whatsapp">WhatsApp</label>
        <input type="text" name="whatsapp" id="whatsapp" placeholder="WhatsApp" value={formData.whatsapp} onChange={handleChange} />

        <label htmlFor="username">Usuario</label>
        <input type="text" name="username" id="username" placeholder="Usuario" value={formData.username} onChange={handleChange} />

        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" value={formData.email} onChange={handleChange} />

        <div className="password-fields">
          <input type={showPassword ? "text" : "password"} name="password" placeholder="Contraseña" value={formData.password} onChange={handleChange} />
          <span type="button" onClick={() => setShowPassword(!showPassword)} className="toggle-password">
            {showPassword ? <i className="icon-eye"></i> : <i className="icon-eye-off"></i>}
          </span>
          <br />
          <button type="button" onClick={handleGeneratePassword} className="generate-password">
            Generar Contraseña
          </button>
          <br />
        </div>

        {/* Select para rol */}
        <label>
          Tipo de usuario
          <br />
          <select name="role" value={formData.role} onChange={handleChange} className="select-role">
            <option value="user">Operador</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <br />

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

        <div>
          <p>imagen de perfil</p>
          <FileUploadComp />
        </div>
        <br />

        <button type="submit">Actualizar</button>
      </form>
    </div>
  );
};

export default UserUpdatePage;
