import React, { useState } from "react";
import Swal from "sweetalert2";
import { authService } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { NavLink, useNavigate } from "react-router";
import "./LoginPage.css";
import { adminEmail, adminPassword } from "../../utils/apiBaseURL";

const LoginPage = () => {
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState(adminPassword);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handlePasswordChange = (e) => setPassword(e.target.value);

  const toggleShowPassword = () => setShowPassword((prevState) => !prevState);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userData = { email, password };
      const response = await authService.signin(userData);
      dispatch(setUser(response));
      Swal.fire("¡Éxito!", "Inicio de sesión exitoso", "success");
      navigate("/dashboard/order/list");
    } catch (error) {
      setError("Correo electrónico o contraseña inválidos");
      Swal.fire("¡Error!", "Correo electrónico o contraseña inválidos", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="LoginPage">
      <aside className="left">
        <img className="logo" src="/logo.svg" alt="" />
        <br />
        <h2>INICIO DE SESIÓN</h2>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <div>
              <input type="email" value={email} onChange={handleEmailChange} required placeholder="user@mail.com" />
            </div>
          </div>

          <div className="form-group">
            <label>Password:</label>
            <div className="password-wrapper">
              <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} required placeholder="************" />
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
            {loading ? "Iniciando..." : "INICIAR SESION"}
          </button>
        </form>
        <br />
        <br />
        <NavLink to="/password/forgot" className={"forgot-password"}>
          RECUPERAR CONTRASEÑA
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

export default LoginPage;
