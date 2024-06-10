import React from "react";
import "./HomeModerator.css";
import HomeModeratorContainer from "./HomeModeratorContainer";

const ModeratorHome = () => {
  const { states } = HomeModeratorContainer();

  return (
    <div className="moderatorHome-container" style={{ padding: "50px" }}>
      <div className="moderatorHome">
        <div className="card">
          <h3>Eventos Criados</h3>
          <p>{states.eventosCriados.length} eventos criados</p>
          <p>Total de alunos inscritos: {states.totalInscritos}</p>
        </div>
        <div className="card">
          <h3>Trabalhos</h3>
          <div className="section">
            <h4>Trabalhos Criados</h4>
            <p>{states.trabalhosCriados.length} trabalhos criados</p>
          </div>
          <div className="section">
            <h4>Trabalhos Aguardando Avaliação</h4>
            <p>
              {states.trabalhosAguardandoNota.length} trabalhos aguardando
              avaliação
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeratorHome;
