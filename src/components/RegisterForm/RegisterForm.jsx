import React, { useState } from "react";
import "./RegisterForm.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

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

          <label htmlFor="name">Nome</label>
          <input
            id="name"
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

          <label htmlFor="confirmPassword">Confirma Senha</label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="Insira sua senha..."
            value={confirmPassword}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label htmlFor="role">Qual sua atribuição </label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
              >
                <MenuItem value={10}>Aluno</MenuItem>
                <MenuItem value={20}>Professor</MenuItem>
              </Select>
            </FormControl>
          </Box>

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
