import React, { useState } from "react";
import Swal from "sweetalert2";
import { authService } from "../../services/apiAuth";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/userSlice";
import { useNavigate } from "react-router";
import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("admin123@gmail.com");
  const [password, setPassword] = useState("SecurePass@2023");
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
      Swal.fire("Success!", "Login successful", "success");
      navigate("/ticket/list");
    } catch (error) {
      setError("Invalid email or password");
      Swal.fire("Error!", "Invalid email or password", "error");
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
          <div className="password-wrapper">
            <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} required placeholder="Enter your password" />
            <button type="button" className="toggle-password" onClick={toggleShowPassword}>
              {showPassword ? (
                <i className="icon-eye"></i> // Ícono para mostrar la contraseña
              ) : (
                <i className="icon-eye-off"></i> // Ícono para ocultar la contraseña
              )}
            </button>
          </div>
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
