import { NavLink } from "react-router-dom";
import { useState } from "react";
import "./SidebarComponent.css";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../../../store/themeSlice";
import { removeUser, toggleRole } from "../../../../store/userSlice";
import { isLocalhost } from "../../../../utils/apiBaseURL";

const SidebarComponent = () => {
  const userSlice = useSelector((state) => state.user);
  const isAdmin = userSlice?.user?.role === "admin";
  const theme = useSelector((state) => state.theme.theme); // Obtener el tema desde Redux
  const dispatch = useDispatch();

  const handleToggleTheme = (event) => {
    event.preventDefault();
    dispatch(toggleTheme()); // Alternar entre dark y light mode
  };

  // ========== temporary ==========
  const handleToggleRole = () => {
    dispatch(toggleRole());
  };

  // ========== temporary ==========

  const logout = () => {
    dispatch(removeUser());
    navigate("/"); // Navegar a la página de "mis-turnos"
  };

  // Establecemos el estado inicial en función del tamaño de la pantalla
  const [sidebar, setSidebar] = useState(() => {
    // Intentamos recuperar el valor de localStorage
    const savedSidebar = localStorage.getItem("sidebar");
    if (savedSidebar) {
      return JSON.parse(savedSidebar);
    }

    // Si no existe en localStorage, chequeamos si es un dispositivo móvil
    return window.innerWidth < 768 ? false : true; // Para móviles, empezar en `false` (sidebar cerrada)
  });

  const [subMenus, setSubMenus] = useState({});

  const toggleSidebar = () => {
    const newSidebarState = !sidebar; // Alternar el estado de la sidebar

    setSidebar(newSidebarState); // Actualizar el estado de la sidebar

    // Guardamos el nuevo estado de la sidebar en localStorage
    localStorage.setItem("sidebar", JSON.stringify(newSidebarState));

    setSubMenus({}); // Limpiar submenús si es necesario
  };

  const toggleSubMenu = (menu) => {
    setSidebar(true);
    setSubMenus((prev) => {
      const newState = { ...prev, [menu]: !prev[menu] };
      Object.keys(prev).forEach((key) => {
        newState[key] = key === menu ? !prev[key] : false;
      });

      return newState;
    });
  };

  return (
    <>
      <nav id="SidebarComponent" className={sidebar ? "" : "close"}>
        <ul className="top">
          <li className="logo-container">
            {sidebar && (theme === "dark" ? <img className="logo" src="/logo-dark.svg" alt="" /> : <img className="logo" src="/logo.svg" alt="" />)}
            {/* <span className="logo">TranspaServic</span> */}
            <button onClick={toggleSidebar} id="toggle-btn" className={`${sidebar ? "rotate" : ""}`}>
              <i className="icon-angle-double-right"></i>
            </button>
          </li>
          <li className="activea">
            <NavLink to="/dashboard" end>
              <i className="icon-home"></i>
              <span>Home</span>
            </NavLink>
          </li>

          <li>
            <button onClick={() => toggleSubMenu("orders")} className={`dropdown-btn ${subMenus.orders ? "rotate" : ""}`}>
              <i className="icon-list-check"></i>
              <span>Ordenes</span>
              <i className="icon-angle-down"></i>
            </button>
            <ul className={`sub-menu ${subMenus.orders ? "show" : ""}`}>
              <div>
                <li>
                  <NavLink to="/dashboard/order/list">Listar</NavLink>
                </li>
                {isAdmin && (
                  <>
                    <li>
                      <NavLink to="/dashboard/order/create">Registrar</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/order/import">Importar</NavLink>
                    </li>
                  </>
                )}
              </div>
            </ul>
          </li>
          {isAdmin && (
            <>
              <li>
                <button onClick={() => toggleSubMenu("users")} className={`dropdown-btn ${subMenus.users ? "rotate" : ""}`}>
                  <i className="icon-users"></i>
                  <span>Usuarios</span>
                  <i className="icon-angle-down"></i>
                </button>
                <ul className={`sub-menu ${subMenus.users ? "show" : ""}`}>
                  <div>
                    <li>
                      <NavLink to="/dashboard/user/list">Listar</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/user/register">Registrar</NavLink>
                    </li>
                  </div>
                </ul>
              </li>
              <li>
                <button onClick={() => toggleSubMenu("operator")} className={`dropdown-btn ${subMenus.operator ? "rotate" : ""}`}>
                  <i className="icon-folder-open"></i>
                  <span>Operadores</span>
                  <i className="icon-angle-down"></i>
                </button>
                <ul className={`sub-menu ${subMenus.operator ? "show" : ""}`}>
                  <div>
                    <li>
                      <NavLink to="/dashboard/operator/list">Listar</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/operator/create">Registrar</NavLink>
                    </li>
                  </div>
                </ul>
              </li>
            </>
          )}
        </ul>

        <ul className="botton">
          <li>
            {sidebar && (
              <div className="user-info">
                <div>
                  <img src={userSlice?.user?.image} alt={userSlice?.user?.firstName} />
                </div>
                <div className="user-name">
                  <span> {userSlice?.user?.firstName}</span>
                </div>
                {isAdmin ? (
                  <div className="user-role">
                    {/* <span> {userSlice?.user?.role}</span> */}
                    <span>Administrador</span>
                  </div>
                ) : (
                  <>
                    <span className="operator"> {userSlice?.user?.operator?.name}</span>
                  </>
                )}
              </div>
            )}
            <hr className="hr" />
            <br />
          </li>
          {isAdmin && (
            <>
              <li>
                <button onClick={() => toggleSubMenu("config")} className={`dropdown-btn ${subMenus.config ? "rotate" : ""}`}>
                  <i className="icon-settings"></i>
                  <span>Configuración</span>
                  <i className="icon-angle-down"></i>
                </button>
                <ul className={`sub-menu ${subMenus.config ? "show" : ""}`}>
                  <div>
                    <li>
                      <NavLink to="/dashboard/config/database">Base de datos</NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/config/whatsapp">WhatsApp</NavLink>
                    </li>
                  </div>
                </ul>
              </li>
            </>
          )}
          <li>
            <NavLink to="/" end>
              <i className="icon-logout"></i>
              <span onClick={logout}>Cerrar sesión</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/help" end>
              <i className="icon-help"></i>
              <span>Centro de ayuda</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" onClick={handleToggleTheme}>
              <i className={theme === "dark" ? "icon-moon" : "icon-sun"}></i>
              <span>{theme === "dark" ? "Modo Oscuro" : "Modo Claro"}</span>
            </NavLink>
          </li>
          {isLocalhost && (
            <li style={{ textAlign: "center" }}>
              <br />
              <hr />
              <span>solo desarrollo</span>
              <br />
              <br />
              <span style={{ cursor: "pointer", border: "1px solid lightgreen", padding: "5px", margin: "5px" }} onClick={handleToggleRole}>
                Role
              </span>
              <NavLink style={{ display: "inline", border: "1px solid lightgreen", padding: "5px", margin: "5px" }} to="/dev">
                dev
              </NavLink>
              <br />
              <br />
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default SidebarComponent;
