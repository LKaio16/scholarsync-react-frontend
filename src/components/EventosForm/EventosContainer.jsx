import React, { useState, useEffect } from "react";
import axios from "axios";

const getToken = () => {
  return localStorage.getItem("token");
};

const getUserDetails = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function EventosContainer() {
  const [eventos, setEventos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [localizacao, setLocalizacao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [tipo, setTipo] = useState("");
  const [user, setUser] = useState(null);
  const [editingEvento, setEditingEvento] = useState(null);
  const [searchTitulo, setSearchTitulo] = useState("");
  const [filterInscritos, setFilterInscritos] = useState(false);
  const [frequencias, setFrequencias] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedEvento, setSelectedEvento] = useState(null);

  useEffect(() => {
    const userDetails = getUserDetails();
    if (userDetails) {
      setUser(userDetails);
      findFrequenciasByAluno(userDetails.id);
    }
    fetchEventos();
  }, []);

  const handleOpenModal = (evento) => {
    setSelectedEvento(evento);
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
    setSelectedEvento(null);
  };

  const handleChange = (event) => {
    setTipo(event.target.value);
  };

  const fetchEventos = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/eventos");
      console.log(response);
      setEventos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar eventos", error);
      setError(error.response.data);
    }
  };

  const findFrequenciasByAluno = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/frequencias/aluno/${userId}`
      );
      setFrequencias(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar frequências", error);
      setError(error.response.data);
    }
  };

  const findFrequenciasByEvento = async (eventoID) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/frequencias/evento/${eventoID}`
      );
      console.log(response);
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar frequências", error);
      setError(error.response.data);
      return [];
    }
  };

  const searchEventos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://localhost:8080/api/eventos/search",
        {
          params: {
            titulo: searchTitulo,
            inscritos:
              user && user.roles.includes("ROLE_USER") ? filterInscritos : null,
          },
        }
      );
      setEventos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar eventos", error);
      setError(error.response.data);
    }
  };

  const createEvento = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/eventos", {
        titulo,
        descricao,
        localizacao,
        dataInicio,
        dataFim,
        tipo,
      });
      fetchEventos();
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao criar evento", error);
      setError(error.response.data);
    }
  };

  const inscrever = async (id) => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/api/eventos/${id}/inscrever`);
      fetchEventos();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao inscrever no evento", error);
      setError(error.response.data);
    }
  };

  const selectEventoForEdit = (evento) => {
    setEditingEvento(evento);
    setTitulo(evento.titulo);
    setDescricao(evento.descricao);
    setLocalizacao(evento.localizacao);
    setDataInicio(new Date(evento.dataInicio).toISOString().slice(0, 16));
    setDataFim(new Date(evento.dataFim).toISOString().slice(0, 16));
    setTipo(evento.tipo);
  };

  const editEvento = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/eventos/${editingEvento.id}`, {
        titulo,
        descricao,
        localizacao,
        dataInicio,
        dataFim,
        handleChange,
        tipo,
      });
      fetchEventos();
      resetForm();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao editar evento", error);
      setError(error.response.data);
    }
  };

  const resetForm = () => {
    setEditingEvento(null);
    setTitulo("");
    setDescricao("");
    setLocalizacao("");
    setDataInicio("");
    setDataFim("");
    setTipo("");
  };

  useEffect(() => {
    if (user && user.roles.includes("ROLE_MODERATOR")) {
      fetchEventosComUsuarios();
    }
  }, [user]);

  const fetchEventosComUsuarios = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/eventos");
      setEventos(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao buscar eventos", error);
      setError(error.response.data);
    }
  };

  const registrarFrequencia = async (eventoId, alunoId) => {
    setLoading(true);
    try {
      await axios.post(
        `http://localhost:8080/api/frequencias/registrar`,
        null,
        {
          params: {
            eventoId,
            alunoId,
          },
        }
      );
      fetchEventosComUsuarios();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao registrar frequência", error);
      setError(error.response.data);
    }
  };

  const gerarCertificado = async (eventoId) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8080/api/frequencias/certificado?eventoId=${eventoId}&alunoId=${user.id}`,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "certificado.pdf");
      document.body.appendChild(link);
      link.click();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Erro ao gerar certificado", error);
      setError(error.response.data);
    }
  };

  const handleGenerateCertificate = async (eventoId) => {
    gerarCertificado(eventoId);
  };

  const handleRegistrarFrequencia = async (eventoId, alunoId, username) => {
    setLoading(true);
    const frequencias = await findFrequenciasByEvento(eventoId);
    if (
      !frequencias.some(
        (frequencia) => frequencia.nomeParticipante === username
      )
    ) {
      setLoading(false);
      registrarFrequencia(eventoId, alunoId);
    } else {
      setLoading(false);
      setError("Já há frequência registrada para esse aluno com esse evento");
    }
  };

  return {
    states: {
      eventos,
      titulo,
      descricao,
      localizacao,
      dataInicio,
      dataFim,
      tipo,
      user,
      editingEvento,
      searchTitulo,
      filterInscritos,
      error,
      frequencias,
      loading,
      modalIsOpen,
      selectedEvento,
    },
    functions: {
      fetchEventos,
      searchEventos,
      createEvento,
      inscrever,
      selectEventoForEdit,
      editEvento,
      resetForm,
      setEventos,
      setTitulo,
      setDescricao,
      setLocalizacao,
      setDataInicio,
      setDataFim,
      setTipo,
      setUser,
      setEditingEvento,
      setSearchTitulo,
      setFilterInscritos,
      setError,
      registrarFrequencia,
      gerarCertificado,
      findFrequenciasByAluno,
      setFrequencias,
      findFrequenciasByEvento,
      handleGenerateCertificate,
      handleRegistrarFrequencia,
      handleChange,
      handleOpenModal,
      handleCloseModal,
    },
  };
}

export default EventosContainer;
