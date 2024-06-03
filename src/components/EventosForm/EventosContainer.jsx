import React, { useState, useEffect } from "react";
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

function EventosContainer() {
    const [eventos, setEventos] = useState([]);
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [localizacao, setLocalizacao] = useState('');
    const [dataInicio, setDataInicio] = useState('');
    const [dataFim, setDataFim] = useState('');
    const [tipo, setTipo] = useState('');
    const [user, setUser] = useState(null);
    const [editingEvento, setEditingEvento] = useState(null);
    const [searchTitulo, setSearchTitulo] = useState('');
    const [filterInscritos, setFilterInscritos] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const userDetails = getUserDetails();
        if (userDetails) {
            setUser(userDetails);
        }
        fetchEventos();
    }, []);

    const fetchEventos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/eventos');
            setEventos(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos', error);
            setError(error.response.data);
        }
    };

    const searchEventos = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/eventos/search', {
                params: {
                    titulo: searchTitulo,
                    inscritos: user && user.roles.includes('ROLE_USER') ? filterInscritos : null
                }
            });
            setEventos(response.data);
        } catch (error) {
            console.error('Erro ao buscar eventos', error);
            setError(error.response.data);
        }
    };

    const createEvento = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/api/eventos', {
                titulo,
                descricao,
                localizacao,
                dataInicio,
                dataFim,
                tipo,
            });
            fetchEventos();
            resetForm();
        } catch (error) {
            console.error('Erro ao criar evento', error);
            setError(error.response.data);
        }
    };

    const inscrever = async (id) => {
        try {
            await axios.post(`http://localhost:8080/api/eventos/${id}/inscrever`);
            fetchEventos();
        } catch (error) {
            console.error('Erro ao inscrever no evento', error);
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
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/api/eventos/${editingEvento.id}`, {
                titulo,
                descricao,
                localizacao,
                dataInicio,
                dataFim,
                tipo,
            });
            fetchEventos();
            resetForm();
        } catch (error) {
            console.error('Erro ao editar evento', error);
            setError(error.response.data);
        }
    };

    const resetForm = () => {
        setEditingEvento(null);
        setTitulo('');
        setDescricao('');
        setLocalizacao('');
        setDataInicio('');
        setDataFim('');
        setTipo('');
    };
    return {
        states: {eventos, titulo, descricao, localizacao, dataInicio, dataFim, tipo, user, editingEvento, searchTitulo, filterInscritos, error },
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
            setError
        },
    };
}

export default EventosContainer;
