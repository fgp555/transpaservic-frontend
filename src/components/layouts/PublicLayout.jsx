import React from "react";
import "./PublicLayout.css";
import { Navbar } from "../Navbar/Navbar";
import FooterPublic from "../FooterPublic/FooterPublic";

export const PublicLayout = ({ children }) => {
  return (
    <div className="PublicLayout">
      <Navbar />
      <main>{children}</main>
      <FooterPublic />
    </div>
  );
};

export default PublicLayout;
