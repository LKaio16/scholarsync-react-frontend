import React, { useState } from "react";
import "./Header.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const direcionaTrabalhos = () => {
    navigate("/trabalhos");
  };

  const direcionaEventos = () => {
    navigate("/eventos");
  };

  const direcionaHome = () => {
    navigate("/");
  };



  return (
    <div className="header-container">
      <img onClick={direcionaHome} src={Logo} alt="" className="logo" />
      <div className="header-menu-container">
        <a onClick={direcionaEventos}>Eventos</a>
        <a onClick={direcionaTrabalhos}>Trabalhos</a>
        <a onClick={logout}>Sair</a>
      </div>
    </div>
  );
}

export default Header;
