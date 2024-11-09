// src/components/Cadastro.jsx
import React, { useState } from "react";
import "../styles/Global.css";
import logoSolForm from "../img/Sun (1).png";

import logoSrp from '../img/SRP Viagens.png'
import logoSol from '../img/Sun.png'

const Cancelamento = () => {
  return (
      <div className="auth-container">
        <div className="form-container">
          <div className="top">
            <div className="logo-form">
              <img src={logoSolForm} alt="Profile"></img>
            </div>
            <h2>Cancelamento</h2>
          </div>
          <form>
            <div className="input-group">
              <label>Cpf:</label>
              <input type="text" required />
            </div>
            <div className="input-group">
              <label>Senha:</label>
              <input type="email" required />
            </div>
            <div className="input-group">
              <label>Justificativa:</label>
              <textarea
                id="mensagem"
                rows="4"
                cols="50"
                placeholder="Digite sua mensagem aqui..."
                required
              ></textarea>
            </div>
            <button type="submit">Cancelar</button>
            <p>Foi engano? Clique no botão a baixo para voltar</p>
            <button type="submit">Voltar</button>
          </form>
        </div>
      </div>
  );
};

export default Cancelamento;
