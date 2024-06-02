import React, { useState } from "react";
import "./Header.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";

function Header() {
  return (
    <div className="header-container">
      <img src={Logo} alt="" className="logo" />
      <div className="header-menu-container">
        <a href="">Eventos</a>
        <a href="">Trabalhos</a>
        <a href="">Sair</a>
      </div>
    </div>
  );
}

export default Header;
