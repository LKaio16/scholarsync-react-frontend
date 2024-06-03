import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function UserTrabalhosContainer() {
  const [trabalhosDisponiveis, setTrabalhosDisponiveis] = useState([]);
  const [trabalhosEnviados, setTrabalhosEnviados] = useState([]);
  const [user] = useState(getUserDetails());
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrabalhos();
  }, []);

  const fetchTrabalhos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trabalhos');
      const trabalhos = response.data;
  
      if (!trabalhos || !Array.isArray(trabalhos)) {
        console.error('Erro: trabalhos não é um array válido');
        return;
      }
  
      const trabalhosDisponiveis = trabalhos.filter(trabalho => !trabalho.solucoes || trabalho.solucoes.length === 0 || !trabalho.solucoes.some(solucao => solucao.aluno === user.username));
      const trabalhosEnviados = trabalhos.filter(trabalho => trabalho.solucoes && trabalho.solucoes.some(solucao => solucao.aluno === user.username));
      
      setTrabalhosDisponiveis(trabalhosDisponiveis);
      setTrabalhosEnviados(trabalhosEnviados);
    } catch (error) {
      console.error('Erro ao buscar trabalhos', error);
      setError(error.response.data);
    }
  };

  const handleFileUpload = async (trabalhoId, file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post(`http://localhost:8080/api/trabalhos/${trabalhoId}/solucoes`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetchTrabalhos();
    } catch (error) {
      console.error('Erro ao fazer upload da solução', error);
      setError(error.response.data);
    }
  };

  return {
    states: { trabalhosDisponiveis, trabalhosEnviados, user, error },
    functions: { handleFileUpload, setError }
  };
}

export default UserTrabalhosContainer;
