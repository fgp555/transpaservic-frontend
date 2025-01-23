import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, toggleAdmin } from "../store/userSlice";
import { NavLink, useNavigate } from "react-router";
import MenuDev from "./MenuDev";
import ExcelReader from "./ExcelReader";

const DevelopmentPage = () => {
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
    <div>
      <MenuDev />
      {/* <ExcelReader /> */}
    </div>
  );
};

export default DevelopmentPage;
