import React, { useState } from "react";
import "./HomeAluno.css";
import Header from "../Header/Header";
import EventosForm from "../EventosForm/EventosForm";

function HomeAluno() {
  return (
    <div className="homeAluno-container">
      <div className="homeAluno">
        <Header />
      </div>
    </div>
  );
}

export default HomeAluno;
