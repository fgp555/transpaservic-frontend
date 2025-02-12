import React, { useState } from "react";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import "./ForgotPassword.css";
import { authPasswordService } from "../../../services/apiAuthPassword";

const ForgotPassword = () => {
  const [email, setEmail] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [domain, setDomain] = useState(window.location.origin); // Dominio de la aplicación

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authPasswordService.forgotPassword(email, domain);
      console.log(response); // Verifica la respuesta
      Swal.fire("¡Éxito!", "Te hemos enviado un correo electrónico para restablecer tu contraseña. Revisa tu bandeja de entrada.", "success");
    } catch (error) {
      // Si el error es una instancia de Error que viene del backend, maneja el mensaje de error
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        setError(message || "Hubo un problema al enviar el email");
        Swal.fire("Error!", message || "Hubo un problema al enviar el email", "error");
      } else {
        setError(error.message || "Error desconocido");
        Swal.fire("Error!", error.message || "Hubo un problema al enviar el email", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ForgotPassword">
      <aside className="left">
        <img className="logo" src="/logo.svg" alt="" />
        <br />
        <h2>RECUPERAR CONTRASEÑA</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <div>
              <input type="email" value={email} onChange={handleEmailChange} required placeholder="user@mail.com" />
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}

          <br />
          <button type="submit" disabled={loading} className="btn btn-primary">
            {loading ? "Enviando..." : "Enviar email"}
          </button>
        </form>
        <br />
        <br />
        <NavLink to="/" className={"forgot-password"}>
          INICIAR SESION
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
          {/* <img src="https://i.postimg.cc/KYKcm5qw/transpaservic-04-buss.webp" alt="" /> */}
        </article>
        <article className="right-text">
          <h3>TRANSPORTE ESPECIAL </h3>
          <h3>DE PASAJEROS Y TURISMO</h3>
          {/* <pre>{JSON.stringify({ email, domain }, null, 2)}</pre> */}
        </article>
      </aside>
    </div>
  );
};

export default ForgotPassword;
