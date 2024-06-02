import React, { useState } from "react";
import "./RegisterForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function RegisterContainer() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setRole(event.target.value);
  };

  const direcionaLogin = (event) => {
    navigate("/login");
  };

  async function handleSubmit(event) {
    event.preventDefault(); // Isso impedirá o recarregamento da página
    setError(null);

    if (password !== confirmPassword) {
      setError("Senhas não são iguais!");
      return; // Interrompe a função se as senhas não coincidirem
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/signup",
        {
          username: username,
          nome: name,
          password: password,
          email: email,
          role: [role],
        }
      );
      console.log(response);

      // Limpar todos os campos após o registro bem sucedido
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("");
      setUsername("");
      setError(null);
    } catch (error) {
      setError(error.response.data);
    }
  }

  return {
    states: { username, password, name, email, role, confirmPassword, error },
    functions: {
      setUsername,
      setPassword,
      setConfirmPassword,
      setName,
      setEmail,
      setRole,
      handleSubmit,
      handleChange,
      direcionaLogin,
    },
  };
}

export default RegisterContainer;
