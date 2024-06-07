import React, { useEffect, useState } from "react";
import axios from "axios";

const getToken = () => {
    return localStorage.getItem('token');
  };
  
  const getUserDetails = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  };
  
  axios.interceptors.request.use(
    config => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );
  

function HomeAlunoContainer() {
    const [eventosNaoInscritos, setEventosNaoInscritos] = useState([]);
    const [trabalhosPendentes, setTrabalhosPendentes] = useState([]);
  
    useEffect(() => {
      axios.get('http://localhost:8080/api/eventos/naoInscritos')
        .then(response => setEventosNaoInscritos(response.data))
        .catch(error => console.error('Erro ao buscar eventos não inscritos:', error));
  
      axios.get('http://localhost:8080/api/trabalhos/pendentes')
        .then(response => setTrabalhosPendentes(response.data))
        .catch(error => console.error('Erro ao buscar trabalhos pendentes:', error));
    }, []);
  
  return {
    states: { eventosNaoInscritos, trabalhosPendentes },
    functions: { setEventosNaoInscritos, setTrabalhosPendentes },
  };
}

export default HomeAlunoContainer;
