import React from "react";
import EventosForm from "../components/EventosForm/EventosForm";
import Header from "../components/Header/Header";

function Eventos() {
  return (
    <>
      <div className="homeAluno-container">
        <div className="homeAluno">
          <Header />
          <EventosForm />
        </div>
      </div>
    </>

  );
}

export default Eventos;
