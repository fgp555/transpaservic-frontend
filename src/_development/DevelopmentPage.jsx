import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser, toggleRole } from "../store/userSlice";
import { NavLink, useNavigate } from "react-router";
import MenuDev from "./MenuDev/MenuDev";
import UploadFileDev from "./UploadFileDevComp/UploadFileDev";

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

  const handleToggleRole = () => {
    dispatch(toggleRole());
  };
  return (
    <div>
      <UploadFileDev />
      {/* <MenuDev /> */}
    </div>
  );
};

export default DevelopmentPage;
