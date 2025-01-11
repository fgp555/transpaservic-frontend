import { NavLink } from "react-router";
import "./Navbar.css";

export function Navbar() {
  // const isLogin = useSelector((state) => state.user.login);

  const isLogin = true

  return (
    <nav className="Navbar">
      <aside className="left">
        <NavLink to="/" end>Logo</NavLink>
      </aside>
      <aside className="right">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/about" end>About</NavLink>
        <NavLink to="/login" end>login</NavLink>
        <NavLink to="/user/list" end>user/list</NavLink>
        <NavLink to="/404" end>404</NavLink>
        {isLogin && <NavLink to="/dashboard" end>Dashboard</NavLink>}
      </aside>
    </nav>
  );
}
