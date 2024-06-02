import React, { useState } from "react";
import "./LoginForm.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";
import LoginContainer from "./LoginContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function LoginForm() {
  const { states, functions } = LoginContainer();
  return (
    <div className="login-container">
      <div className="form-container">
        {states.error !== null && (
          <Alert
            severity="error"
            style={{ marginBottom: "20px", borderRadius: "40px" }}
          >
            {states.error}
          </Alert>
        )}
        <img src={Logo} alt="Logo" className="logo" />{" "}
        <h2 className="title">Entre em sua conta</h2>
        <form className="labels-container" onSubmit={functions.handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            placeholder="Insira seu usuário..."
            value={states.username}
            onChange={(e) => functions.setUsername(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Insira sua senha..."
            value={states.password}
            onChange={(e) => functions.setPassword(e.target.value)}
          />
          <button className="button-login" type="submit">
            Logar
          </button>
        </form>
        <div className="existingUser-container">
          <h4>- OU -</h4>
          <div className="disclaimer">
            Não possui conta?{" "}
            <a onClick={functions.direcionaRegister}>Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
