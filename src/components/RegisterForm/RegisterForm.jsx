import React, { useState } from "react";
import "./RegisterForm.css";
import Logo from "../../../src/assets/images/Logo-SchorlarSync.svg";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RegisterContainer from "./RegisterContainer";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";

function RegisterForm() {
  const { states, functions } = RegisterContainer();
  return (
    <div className="register-container">
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
        <h2 className="title">Registre sua conta</h2>
        <form className="labels-container" onSubmit={functions.handleSubmit}>
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            placeholder="Insira seu usuário..."
            value={states.username}
            onChange={(e) => functions.setUsername(e.target.value)}
          />

          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            placeholder="Insira seu nome..."
            value={states.name}
            onChange={(e) => functions.setName(e.target.value)}
          />

          <label htmlFor="name">Email</label>
          <input
            id="email"
            type="text"
            placeholder="Insira seu email..."
            value={states.email}
            onChange={(e) => functions.setEmail(e.target.value)}
          />

          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            placeholder="Insira sua senha..."
            value={states.password}
            onChange={(e) => functions.setPassword(e.target.value)}
          />

          <label htmlFor="confirmPassword">Confirma Senha</label>
          <input
            id="confirmPassword"
            type="password"
            value={states.confirmPassword}
            placeholder="Insira sua senha..."
            onChange={(e) => functions.setConfirmPassword(e.target.value)}
          />

          <label htmlFor="role">Qual sua atribuição </label>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Cargo</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={states.role}
                label="Age"
                onChange={functions.handleChange}
              >
                <MenuItem value={"ROLE_USER"}>Aluno</MenuItem>
                <MenuItem value={"ROLE_MODERATOR"}>Professor</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <button className="button-register" type="submit">
            Cadastrar
          </button>
        </form>
        <div className="existingUser-container">
          <h4>- OU -</h4>
          <div className="disclaimer">
            Já possui conta? <a onClick={functions.direcionaLogin}>Entre</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
