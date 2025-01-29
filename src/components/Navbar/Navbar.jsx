import { NavLink, useNavigate } from "react-router";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, toggleAdmin } from "../../../store/userSlice";

export function Navbar() {
  const userSlice = useSelector((state) => state.user);
  const isLogin = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = userSlice?.user?.role === "admin";

  const logout = () => {
    dispatch(removeUser());
    navigate("/"); // Navegar a la página de "mis-turnos"
  };

  // const isLogin = true;

  const handleToggleRole = () => {
    dispatch(toggleAdmin());
  };

  return (
    <nav className="Navbar">
      <aside>
        <h3>
          <span style={{ color: "peru" }}>Bienvenido </span>
          <span> {userSlice?.user?.firstName}</span>
          <span> {userSlice?.user?.lastName}</span>
          <span style={{ color: "Highlight" }}> {userSlice?.user?.operator?.name}</span>
        </h3>
      </aside>
      <aside className="left"><NavLink to="/" end>INICIO</NavLink>
        <NavLink to="/login" end>login</NavLink>
        {isLogin && (<NavLink to="/dashboard" end>Dashboard</NavLink>)}
        <NavLink to="/about" end>About</NavLink>
        <NavLink to="/404" end>404</NavLink>
        <button onClick={logout}>logout</button>
      </aside>
      <aside>
        <b>ORDENES</b>
        <NavLink to="/dashboard/order/list" end>list</NavLink>
        {isAdmin ?<>
        <NavLink to="/dashboard/order/create" end>create</NavLink>
        <NavLink to="/dashboard/order/update/1" end>update</NavLink>
        <NavLink to="/dashboard/order/delete" end>delete</NavLink>
        <NavLink to="/dashboard/order/import" end>import</NavLink>
        </>:<>
        <NavLink to="/404" end>Aprobar-Ver</NavLink>
        </>}
      </aside>
      {isAdmin &&<>
      <aside className="right">
        <b>USUARIOS</b>
        <NavLink to="/dashboard/user/list" end>list</NavLink>
        <NavLink to="/dashboard/user/register" end>register</NavLink>
        <NavLink to="/dashboard/user/update/1" end>update</NavLink>
        <NavLink to="/dashboard/user/delete" end>delete</NavLink>
      </aside>
      <aside>
        <b>OPERADORES</b>
        <NavLink to="/dashboard/operator/list" end>list</NavLink>
        <NavLink to="/dashboard/operator/create" end>create</NavLink>
        <NavLink to="/dashboard/operator/update/1" end>update</NavLink>
        <NavLink to="/dashboard/operator/delete" end>delete</NavLink>
      </aside>
      <aside>
        <b>MUNICIPIOS</b>
        <NavLink to="/dashboard/municipality/list" end>list</NavLink>
      </aside>
      <aside>
        <b>HERRAMIENTAS</b>
        <NavLink to="/dashboard/config/database" end>Base de datos</NavLink>
      </aside>
      <aside>
        <b>COMPONENTS</b>
        <NavLink to="/404" end>Forgot Password</NavLink>
        <NavLink to="/404" end>Reset Password</NavLink>
        <NavLink to="/404" end>Loading</NavLink>
      </aside>
      </>}
      <br />
      <aside>
        <span>Operador: {userSlice?.user?.operator?.name}</span>
        <span>Role: {userSlice?.user?.role}</span>
        <button onClick={handleToggleRole}>Toggle Role</button>
      </aside>
    </nav>
  );
}
