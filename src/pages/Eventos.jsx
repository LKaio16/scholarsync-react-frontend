import React from "react";
import EventosForm from "../components/EventosForm/EventosForm";
import Header from "../components/Header/Header";

function Eventos() {
  return (
    <>
      <div className="container-geral">
        <div className="container-conteudo">
          <Header />
          <EventosForm />
        </div>
      </div>
    </>
  );
}

export default Eventos;
