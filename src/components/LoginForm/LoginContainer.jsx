import React, { useContext, useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function LoginContainer() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const direcionaRegister = (event) => {
    navigate("/register");
  };

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const response = await axios.post(
        "http://localhost:8080/api/auth/signin",
        {
          username: username,
          password: password,
        }
      );
      const usuarioLogado = {
        id: response.data.id,
        username: response.data.username,
        roles: response.data.roles,
      };
      const token = response.data.token;
      login(token, usuarioLogado);
      navigate("/");
    } catch (error) {
      setError(error.response.data);
    }
  }

  return {
    states: { username, password, error },
    functions: { setUsername, setPassword, handleSubmit, direcionaRegister },
  };
}

export default LoginContainer;
