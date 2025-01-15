import { NavLink, useNavigate } from "react-router";
import "./Navbar.css";
import { useDispatch } from "react-redux";
import { removeUser } from "../../../store/userSlice";

export function Navbar() {
  // const isLogin = useSelector((state) => state.user.login);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    dispatch(removeUser());
    navigate("/"); // Navegar a la página de "mis-turnos"
  };

  const isLogin = true;

  return (
    <nav className="Navbar">
      <aside className="left"><NavLink to="/login" end>INICIO</NavLink>
        {isLogin && (<NavLink to="/dashboard" end>Dashboard</NavLink>)}
        <NavLink to="/about" end>About</NavLink>
        <NavLink to="/404" end>404</NavLink>
        <button onClick={logout}>logout</button>
      </aside>
      <aside>
        <b>TICKETS</b>
        <NavLink to="/ticket/filter" end>filter</NavLink>
        <NavLink to="/ticket/list" end>list</NavLink>
        <NavLink to="/ticket/create" end>create</NavLink>
        <NavLink to="/ticket/import" end>import</NavLink>
        <NavLink to="/ticket/update/1" end>update</NavLink>
        <NavLink to="/ticket/delete" end>delete</NavLink>
      </aside>
      <aside className="right">
        <b>USUARIOS</b>
        <NavLink to="/user/list" end>list</NavLink>
        <NavLink to="/user/register" end>register</NavLink>
        <NavLink to="/" end>login</NavLink>
        <NavLink to="/user/update/1" end>update</NavLink>
        <NavLink to="/user/delete" end>delete</NavLink>
      </aside>
      <aside>
        <b>TRANSPORTES</b>
        <NavLink to="/transport/list" end>list</NavLink>
        <NavLink to="/transport/create" end>create</NavLink>
        <NavLink to="/transport/update/1" end>update</NavLink>
        <NavLink to="/transport/delete" end>delete</NavLink>
      </aside>
      <aside>
        <b>MUNICIPALITY</b>
        <NavLink to="/municipality/list" end>list</NavLink>
      </aside>
      <aside>
        <b>CONFIG</b>
        <NavLink to="/config/database" end>Base de datos</NavLink>
      </aside>
    </nav>
  );
}
