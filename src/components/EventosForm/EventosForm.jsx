import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EventosFormCss.css";
import EventosContainer from "./EventosContainer";
import Alert from "@mui/material/Alert";
import Loading from "../Loading/Loading.js";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "react-modal";

function EventosForm() {
  const { states, functions } = EventosContainer();

  return (
    <div style={{ padding: "10px 50px 50px 50px" }}>
      <div className="EventosForm">
        {states.loading && <Loading />}
        {states.error !== null && (
          <Alert
            severity="error"
            style={{ marginBottom: "20px", borderRadius: "40px", width: "70%" }}
          >
            {states.error}
          </Alert>
        )}
        <h1>Eventos</h1>
        {states.user && (
          <div className="search-bar">
            <input
              type="text"
              className="input-pesquisa-evento"
              placeholder="Pesquisar por título"
              value={states.searchTitulo}
              onChange={(e) => functions.setSearchTitulo(e.target.value)}
            />
            <button className="button-padrao" onClick={functions.searchEventos}>
              Filtrar
            </button>
            {states.user.roles.includes("ROLE_USER") && (
              <div className="filter-option">
                <label>
                  <input
                    type="checkbox"
                    checked={states.filterInscritos}
                    onChange={(e) =>
                      functions.setFilterInscritos(e.target.checked)
                    }
                  />
                  Mostrar apenas inscritos
                </label>
              </div>
            )}
          </div>
        )}
        {states.user && states.user.roles.includes("ROLE_MODERATOR") && (
          <form
            className="formulario"
            onSubmit={
              states.editingEvento
                ? functions.editEvento
                : functions.createEvento
            }
          >
            <input
              type="text"
              placeholder="Título"
              value={states.titulo}
              onChange={(e) => functions.setTitulo(e.target.value)}
            />
            <input
              type="text"
              placeholder="Descrição"
              value={states.descricao}
              onChange={(e) => functions.setDescricao(e.target.value)}
            />
            <input
              type="text"
              placeholder="Localização"
              value={states.localizacao}
              onChange={(e) => functions.setLocalizacao(e.target.value)}
            />
            <input
              type="datetime-local"
              value={states.dataInicio}
              onChange={(e) => functions.setDataInicio(e.target.value)}
            />
            <input
              type="datetime-local"
              value={states.dataFim}
              onChange={(e) => functions.setDataFim(e.target.value)}
            />

            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={states.tipo}
                  label="Age"
                  onChange={functions.handleChange}
                >
                  <MenuItem value={"FISICO"}>Fisico</MenuItem>
                  <MenuItem value={"VIRTUAL"}>Virtual</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <button className="button-padrao" type="submit">
              {states.editingEvento ? "Salvar Alterações" : "Criar Evento"}
            </button>
          </form>
        )}
        <h1>Disponiveis</h1>

        <div className="evento-container">
          {states.eventos.map((evento) => (
            <>
              <div key={evento.id} className="evento-card">
                <h2>{evento.titulo}</h2>
                <div className="evento-infos">
                  <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                  <p>{evento.descricao}</p>

                  <div className="info-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                    >
                      <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                    </svg>
                    <p>{evento.localizacao}</p>
                  </div>

                  <div className="info-item">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M128 0c17.7 0 32 14.3 32 32V64H288V32c0-17.7 14.3-32 32-32s32 14.3 32 32V64h48c26.5 0 48 21.5 48 48v48H0V112C0 85.5 21.5 64 48 64H96V32c0-17.7 14.3-32 32-32zM0 192H448V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V192zm64 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm128 0v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V272c0-8.8-7.2-16-16-16H336zM64 400v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H80c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H208zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V400c0-8.8-7.2-16-16-16H336c-8.8 0-16 7.2-16 16z" />
                    </svg>
                    <p>{new Date(evento.dataInicio).toLocaleString()}</p>
                  </div>

                  <p>{evento.tipo}</p>
                </div>
                {states.user &&
                  states.user.roles.includes("ROLE_USER") &&
                  (evento.participantes &&
                  evento.participantes.some((p) => p.id === states.user.id) ? (
                    <>
                      <button className="button-padrao" disabled>
                        Inscrito
                      </button>
                    </>
                  ) : (
                    <button
                      className="button-padrao"
                      onClick={() => functions.inscrever(evento.id)}
                    >
                      Inscrever-se
                    </button>
                  ))}
                {states.user &&
                  states.user.roles.includes("ROLE_USER") &&
                  evento.participantes &&
                  evento.participantes.some((p) => p.id === states.user.id) && (
                    <>
                      <button
                        className="button-certificado"
                        disabled={
                          !states.frequencias.some(
                            (frequencia) => frequencia.idEvento === evento.id
                          )
                        }
                        onClick={() =>
                          functions.handleGenerateCertificate(evento.id)
                        }
                      >
                        Gerar Certificado
                      </button>
                    </>
                  )}
                {states.user &&
                  states.user.roles.includes("ROLE_MODERATOR") && (
                    <>
                      <button
                        className="button-padrao"
                        onClick={() => functions.selectEventoForEdit(evento)}
                      >
                        Editar
                      </button>

                      <button
                        className="button-padrao"
                        onClick={() => functions.deleteEvento(evento.id)}
                      >
                        Deletar
                      </button>

                      <button
                        className="button-padrao"
                        onClick={() => {
                          functions.handleOpenModal(evento);
                        }}
                      >
                        Ver Inscritos
                      </button>
                    </>
                  )}
              </div>
            </>
          ))}
        </div>
      </div>

      <Modal
        isOpen={states.modalIsOpen}
        onRequestClose={functions.handleCloseModal}
      >
        <h3>Inscritos:</h3>
        {states.selectedEvento !== null &&
        states.selectedEvento.participantes &&
        states.selectedEvento.participantes.length > 0 ? (
          <ul>
            {states.selectedEvento.participantes.map((inscrito) => (
              <li key={inscrito.id}>
                {inscrito.nome} ({inscrito.email})
                <button
                  className="button-padrao"
                  style={{ marginLeft: "50px" }}
                  onClick={() =>
                    functions.handleRegistrarFrequencia(
                      states.selectedEvento.id,
                      inscrito.id,
                      inscrito.username
                    )
                  }
                >
                  Registrar Frequência
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum usuário inscrito.</p>
        )}
      </Modal>
    </div>
  );
}

export default EventosForm;
