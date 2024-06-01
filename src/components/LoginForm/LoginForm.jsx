import React, { useState } from "react";
import "./LoginForm.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className="login-container">
      <div className="form-container">
        <img src={Logo} alt="Logo" className="logo" />{" "}
        <h2 className="title">Entre em sua conta</h2>
        <form className="labels-container" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            placeholder="Insira seu usuário..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Insira sua senha..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button-login" type="submit">
            Logar
          </button>
        </form>
        <div className="existingUser-container">
          <h4>- OU -</h4>
          <div className="disclaimer">
            Não possui conta? <a href="">Cadastre-se</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
