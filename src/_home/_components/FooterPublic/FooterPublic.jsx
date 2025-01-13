import React from "react";
import "./FooterPublic.css";
import { useSelector } from "react-redux";

const FooterPublic = () => {
  const userSlice = useSelector((state) => state.user);
  return (
    <>
      <footer className="FooterPublic">
        <p>Footer Public</p>
      </footer>
      <pre>{JSON.stringify(userSlice.user, null, 2)}</pre>
    </>
  );
};

export default FooterPublic;
