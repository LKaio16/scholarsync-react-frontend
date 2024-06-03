import React from 'react';
import Modal from 'react-modal';
import './ModeratorTrabalhos.css';
import ModeratorTrabalhosContainer from './ModeratorTrabalhosContainer.jsx';
import Alert from "@mui/material/Alert";

function ModeratorTrabalhosForm() {
  const { states, functions } = ModeratorTrabalhosContainer();

  return (
    <div className="moderator-dashboard">
      <center>
       {states.error !== null && (
          <Alert
            severity="error"
            style={{ marginBottom: "20px", borderRadius: "40px", width:'70%' }}>
            {states.error}
          </Alert>
        )}
        </center>
      <div style={{ padding: '50px' }}>
        <h1>Lançar Novo Trabalho</h1>
        <div>
          <label htmlFor="titulo">Título:</label>
          <input type="text" id="titulo" value={states.novoTrabalhoTitulo} onChange={(e) => functions.setNovoTrabalhoTitulo(e.target.value)} />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" value={states.novoTrabalhoDescricao} onChange={(e) => functions.setNovoTrabalhoDescricao(e.target.value)} />
        </div>
        <button onClick={functions.handleLancarNovoTrabalho}>Lançar Novo Trabalho</button>

        <h1>Trabalhos Disponíveis</h1>
        <div className="trabalhos-list">
          {states.trabalhos.map((trabalho) => (
            <div key={trabalho.id} className="trabalho-card">
              <h2>{trabalho.titulo}</h2>
              <p>{trabalho.descricao}</p>
              <button onClick={() => functions.handleVerSolucoes(trabalho.id)}>Ver Soluções</button>
            </div>
          ))}
        </div>
        {states.selectedTrabalho && (
          <div>
            <h2>Soluções para o Trabalho</h2>
            <table className="solucoes-table">
              <thead>
                <tr>
                  <th>Aluno</th>
                  <th>Data de Submissão</th>
                  <th>Comentário de Avaliação</th>
                  <th>Nota</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {states.solucoes.map((solucao) => (
                  <tr key={solucao.id}>
                    <td>{solucao.aluno}</td>
                    <td>{solucao.dataSubmissao}</td>
                    <td>{solucao.comentarioAvaliacao}</td>
                    <td>{solucao.notaAvaliacao}</td>
                    <td>
                      <button onClick={() => functions.handleDownloadSolucao(solucao.id)}>Baixar Solução</button>
                      <button onClick={() => { functions.setSelectedSolucao(solucao); functions.handleOpenModal(); }}>Avaliar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <Modal isOpen={states.modalIsOpen} onRequestClose={functions.handleCloseModal}>
          <h2>Avaliar Solução</h2>
          <div>
            <label htmlFor="avaliacaoNota">Nota:</label>
            <input type="text" id="avaliacaoNota" value={states.avaliacaoNota} onChange={(e) => functions.setAvaliacaoNota(e.target.value)} />
          </div>
          <div>
            <label htmlFor="avaliacaoComentario">Comentário:</label>
            <textarea id="avaliacaoComentario" value={states.avaliacaoComentario} onChange={(e) => functions.setAvaliacaoComentario(e.target.value)} />
          </div>
          <button onClick={() => functions.handleAvaliarSolucao(states.selectedSolucao.id, states.avaliacaoComentario, states.avaliacaoNota)}>Enviar Avaliação</button>
          <button onClick={functions.handleCloseModal}>Cancelar</button>
        </Modal>
      </div>
    </div>
  );
}

export default ModeratorTrabalhosForm;
