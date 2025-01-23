import React, { useState } from "react";
import Swal from "sweetalert2";
import { authService } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { NavLink, useNavigate } from "react-router";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("SecurePass@2023");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert("Enviar email");
    return;
    setLoading(true);
    try {
      const userData = { email, password };
      const response = await authService.signin(userData);
      dispatch(setUser(response));
      Swal.fire("Success!", "Login successful", "success");
      navigate("/dashboard/ticket/list");
    } catch (error) {
      setError("Invalid email or password");
      Swal.fire("Error!", "Invalid email or password", "error");
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
        </article>
      </aside>
    </div>
  );
};

export default ForgotPassword;
