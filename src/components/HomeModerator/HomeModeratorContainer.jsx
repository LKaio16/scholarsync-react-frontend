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
  

function HomeModeratorContainer() {
    const [eventosCriados, setEventosCriados] = useState([]);
    const [trabalhosCriados, setTrabalhosCriados] = useState([]);
    const [trabalhosAguardandoNota, setTrabalhosAguardandoNota] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/api/eventos/criados')
            .then(response => {
                setEventosCriados(response.data);
                console.log(response);
            })
            .catch(error => console.error('Erro ao buscar eventos criados:', error));

        axios.get('http://localhost:8080/api/trabalhos/criados')
            .then(response => setTrabalhosCriados(response.data))
            .catch(error => console.error('Erro ao buscar trabalhos criados:', error));

        axios.get('http://localhost:8080/api/trabalhos/aguardandoNota')
            .then(response => setTrabalhosAguardandoNota(response.data))
            .catch(error => console.error('Erro ao buscar trabalhos aguardando nota:', error));
    }, []);

    const totalInscritos = eventosCriados.reduce((acc, evento) => {
        const participantes = evento.participantes || [];
        return acc + participantes.length;
    }, 0);

  
  return {
    states: { trabalhosCriados, trabalhosAguardandoNota, totalInscritos, eventosCriados },
    functions: { setTrabalhosCriados, setTrabalhosAguardandoNota },
  };
}

export default HomeModeratorContainer;
