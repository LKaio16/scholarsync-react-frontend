import React, { useState } from "react";
import "./RegisterForm.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onRegister(username, name, password, confirmPassword, role);
  };

  return (
    <div className="register-container">
      <div className="form-container">
        <img src={Logo} alt="Logo" className="logo" />{" "}
        <h2 className="title">Registre sua conta</h2>
        <form className="labels-container" onSubmit={handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            placeholder="Insira seu usuário..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="username">Nome</label>
          <input
            id="username"
            type="text"
            placeholder="Insira seu nome..."
            value={name}
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

          <label htmlFor="password">Confirma Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Insira sua senha..."
            value={confirmPassword}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="button-login" type="submit">
            Cadastrar
          </button>
        </form>
        <div className="existingUser-container">
          <h4>- OU -</h4>
          <div className="disclaimer">
            Já possui conta? <a href="">Entre</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
