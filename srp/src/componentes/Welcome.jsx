import React from "react";
import '../styles/Welcome.css';
import { useNavigate } from "react-router-dom";
import logoSol from "../img/Sun (1).png";

const Welcome = () => {

    const navigate = useNavigate()

  return (
    <div className="welcome-container">
      <img className="logo-form" src={logoSol} />
      <h1 className="welcome-title">SRP</h1>
      <p className="welcome-subtitle">Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
      
      <div className="div-buttons">
        <button className="welcome-button cadastrar" onClick={() => navigate("confirmar/cadastro/coordenador")}>Sou Coordenador</button>
        <button className="welcome-button cadastrar" onClick={() => navigate("/cadastro")}>Sou Passageiro</button>
        <button className="welcome-button login" onClick={() => navigate("/login")}>Entrar</button>
      </div>
      
    </div>
  );
};

export default Welcome;
