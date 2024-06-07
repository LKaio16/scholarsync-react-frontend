import React from 'react';
import "./HomeAluno.css";
import HomeAlunoContainer from './HomeAlunoContainer';

const UserHome = () => {

  const { states } = HomeAlunoContainer();

  return (
    <div  style={{padding:'50px'}}>
      <div className="homeAluno-container">
        <div className="homeAluno">
          <div className="card">
            <h3>Eventos Disponíveis</h3>
            <p>{states.eventosNaoInscritos.length} eventos disponíveis</p>
          </div>
          <br/>
          <div className="card">
            <h3>Trabalhos Pendentes</h3>
            <p>{states.trabalhosPendentes.length} trabalhos pendentes</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
