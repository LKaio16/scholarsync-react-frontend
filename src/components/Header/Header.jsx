import React, { useState } from "react";
import "./Header.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";
import { useAuth } from "../../context/AuthContext";

function Header() {
  const { logout } = useAuth();

  return (
    <div className="header-container">
      <img src={Logo} alt="" className="logo" />
      <div className="header-menu-container">
        <a href="">Eventos</a>
        <a href="">Trabalhos</a>
        <a onClick={logout}>Sair</a>
      </div>
    </div>
  );
}

export default Header;
