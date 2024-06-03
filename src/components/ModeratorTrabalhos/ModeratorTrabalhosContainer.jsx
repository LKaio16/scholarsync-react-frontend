import React, { useState, useEffect } from 'react';
import axios from 'axios';

const getToken = () => {
  return localStorage.getItem('token');
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

function ModeratorTrabalhosContainer() {
  const [trabalhos, setTrabalhos] = useState([]);
  const [selectedTrabalho, setSelectedTrabalho] = useState(null);
  const [solucoes, setSolucoes] = useState([]);
  const [novoTrabalhoTitulo, setNovoTrabalhoTitulo] = useState('');
  const [novoTrabalhoDescricao, setNovoTrabalhoDescricao] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedSolucao, setSelectedSolucao] = useState(null);
  const [avaliacaoComentario, setAvaliacaoComentario] = useState('');
  const [avaliacaoNota, setAvaliacaoNota] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrabalhos();
  }, []);

  const fetchTrabalhos = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/trabalhos/autor');
      setTrabalhos(response.data);
    } catch (error) {
      console.error('Erro ao buscar trabalhos', error);
      setError(error.response.data);
    }
  };

  const handleVerSolucoes = async (trabalhoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/trabalhos/${trabalhoId}/solucoes`);
      setSolucoes(response.data);
      setSelectedTrabalho(trabalhoId);
    } catch (error) {
      console.error('Erro ao buscar soluções', error);
      setError(error.response.data);
    }
  };

  const handleDownloadSolucao = async (solucaoId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/trabalhos/solucoes/${solucaoId}/download`, {
        responseType: 'blob',
      });

      const contentType = response.headers['content-type'];

      const url = window.URL.createObjectURL(new Blob([response.data]));

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `solucao-${solucaoId}.${contentType.split('/')[1]}`);
      document.body.appendChild(link);
      link.click();

    } catch (error) {
      console.error('Erro ao baixar solução', error);
      setError(error.response.data);
    }
  };

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  const handleAvaliarSolucao = async (solucaoId, comentario, nota) => {
    try {
      await axios.post(`http://localhost:8080/api/trabalhos/solucoes/${solucaoId}/avaliar?comentario=${comentario}&nota=${nota}`, {
        comentario,
        nota,
      });
      handleVerSolucoes(selectedTrabalho);
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao avaliar solução', error);
      setError(error.response.data);
    }
  };

  const handleLancarNovoTrabalho = async () => {
    try {
      await axios.post('http://localhost:8080/api/trabalhos', {
        titulo: novoTrabalhoTitulo,
        descricao: novoTrabalhoDescricao
      });
      fetchTrabalhos();
      setNovoTrabalhoTitulo('');
      setNovoTrabalhoDescricao('');
    } catch (error) {
      console.error('Erro ao lançar novo trabalho', error);
      setError(error.response.data);
    }
  };

  const states = {
    trabalhos,
    selectedTrabalho,
    solucoes,
    novoTrabalhoTitulo,
    novoTrabalhoDescricao,
    modalIsOpen,
    selectedSolucao,
    avaliacaoComentario,
    avaliacaoNota,
    error
  };

  const functions = {
    setNovoTrabalhoTitulo,
    setNovoTrabalhoDescricao,
    setModalIsOpen,
    setSelectedSolucao,
    setAvaliacaoComentario,
    setAvaliacaoNota,
    fetchTrabalhos,
    handleVerSolucoes,
    handleDownloadSolucao,
    handleOpenModal,
    handleCloseModal,
    handleAvaliarSolucao,
    handleLancarNovoTrabalho,
    setError
  };

  return { states, functions };
}

export default ModeratorTrabalhosContainer;
