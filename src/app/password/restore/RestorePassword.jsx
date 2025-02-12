import React, { useState } from "react";
import Swal from "sweetalert2";
import { NavLink, useNavigate, useParams } from "react-router";
import "./RestorePassword.css";
import { authPasswordService } from "../../../services/apiAuthPassword";

const RestorePassword = () => {
  const { emailEncrypt } = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => setNewPassword(e.target.value);
  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  // function decryptFromHex(encryptedHex, key) {
  //   let decryptedText = "";
  //   for (let i = 0; i < encryptedHex.length; i += 2) {
  //     const hexPair = encryptedHex.slice(i, i + 2);
  //     const charCode = parseInt(hexPair, 16) ^ key.charCodeAt((i / 2) % key.length);
  //     decryptedText += String.fromCharCode(charCode);
  //   }
  //   return decryptedText;
  // }

  // const encript = btoa("JWT_SECRET");
  // // console.log("encript", encript); // SldUX1NFQ1JFVA==
  // const desencript = atob("SldUX1NFQ1JFVA==");
  // // console.log("desencript", desencript); // JWT_SECRET

  // const decryptedMessage = decryptFromHex(emailEncrypt.toString(), "JWT_SECRET");

  // // console.log("decryptedMessage", decryptedMessage);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authPasswordService.restorePassword(emailEncrypt, newPassword);
      console.log(response); // Verifica la respuesta
      Swal.fire("¡Éxito!", "Tu contraseña ha sido restablecida correctamente. Ahora puedes acceder con tu nueva contraseña.", "success");
      navigate("/");

    } catch (error) {
      setError(error.message || "Error desconocido");
      Swal.fire("Error!", error.message || "Hubo un problema", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="RestorePassword">
      <aside className="left">
        <img className="logo" src="/logo.svg" alt="" />
        <br />
        <h2>NUEVO PASSWORD</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nuevo Password:</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} value={newPassword} onChange={handlePasswordChange} required placeholder="************" />
              <button type="button" className="toggle-password " onClick={toggleShowPassword}>
                {showPassword ? (
                  <i className="icon-eye"></i> // Ícono para mostrar la contraseña
                ) : (
                  <i className="icon-eye-off"></i> // Ícono para ocultar la contraseña
                )}
              </button>
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <br />
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Procesando..." : "RESTABLECER CONTRASEÑA"}
          </button>
        </form>
        <br />
        <br />
        <NavLink to="/" className={"forgot-password"}>
          INICIAR SESIÓN
        </NavLink>
        <br />
        {/* <p>RECUPERAR CONTRASEÑA</p> */}
        <p className="footer">
          Diseñado por <NavLink to="https://www.systered.com/">Systered</NavLink>® - Sistemas y Redes 2025
        </p>
      </aside>

      <aside className="right">
        <article className="right-imgs">
          <img src="https://i.postimg.cc/4yw2TfQ1/transpaservic-01.webp" alt="" />
          <img src="https://i.postimg.cc/nrnS5jBz/transpaservic-02.webp" alt="" />
          <img src="https://i.postimg.cc/JnNdPcyv/transpaservic-03.webp" alt="" />
        </article>
        <article className="right-text">
          <h3>TRANSPORTE ESPECIAL </h3>
          <h3>DE PASAJEROS Y TURISMO</h3>
        </article>
      </aside>
    </div>
  );
};

export default RestorePassword;
