import React from 'react';
import './UserTrabalhosForm.css';
import UserTrabalhosContainer from './UserTrabalhosContainer';
import Alert from "@mui/material/Alert";

function UserTrabalhosForm() {
  const { states, functions } = UserTrabalhosContainer();

  return (
    <div style={{ padding: '50px' }}>
      <div className="user-dashboard">
        {states.error !== null && (
          <Alert
            severity="error"
            style={{ marginBottom: "20px", borderRadius: "40px", width:'70%' }}
          >
            {states.error}
          </Alert>
        )}
        <h1>Trabalhos Disponíveis</h1>
        <div className="trabalhos-list">
          {states.trabalhosDisponiveis.map((trabalho) => (
            <div key={trabalho.id} className="trabalho-card">
              <h2>{trabalho.titulo}</h2>
              <p>{trabalho.descricao}</p>
              <input
                type="file"
                onChange={(e) => functions.handleFileUpload(trabalho.id, e.target.files[0])}
              />
            </div>
          ))}
        </div>

        <h1>Trabalhos Enviados</h1>
        <div className="trabalhos-list">
          {states.trabalhosEnviados.map((trabalho) => (
            <div key={trabalho.id} className="trabalho-card">
              <h2>{trabalho.titulo}</h2>
              <p>{trabalho.descricao}</p>
              {trabalho.solucoes
                .filter((solucao) => solucao.aluno === states.user.username)
                .map((solucao) => (
                  <div key={solucao.id} className="solucao-info">
                    <p><strong>Nota:</strong> {solucao.notaAvaliacao !== null ? solucao.notaAvaliacao : ''}</p>
                    <p><strong>Comentário de Avaliação:</strong> {solucao.comentarioAvaliacao}</p>
                  </div>
                ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserTrabalhosForm;
