import React, { useState } from "react";
// import { authService } from "../../../services/authService";
import Swal from "sweetalert2"; // Para mostrar alertas
// import { useHistory } from "react-router-dom"; // Para redirigir después de un login exitoso
import { authService } from "../../services/apiAuth";

const LoginPage = () => {
  // Estado para los datos del usuario (email y contraseña)
  const [email, setEmail] = useState("admin@cliniccare.com");
  const [password, setPassword] = useState("SecurePass@2023");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // // Historia para redirigir
  // const history = useHistory();

  // Manejar el cambio en los campos de formulario
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Manejar el submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userData = { email, password };
      const response = await authService.signin(userData);

      // Mostrar una alerta si el login es exitoso
      Swal.fire({
        title: "Success!",
        text: "Login successful",
        icon: "success",
        confirmButtonText: "OK",
      });

      // Redirigir al usuario después de iniciar sesión
      // history.push("/dashboard");
    } catch (error) {
      setError("Invalid email or password");
      Swal.fire({
        title: "Error!",
        text: "Invalid email or password",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={handleEmailChange} required placeholder="Enter your email" />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={handlePasswordChange} required placeholder="Enter your password" />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
