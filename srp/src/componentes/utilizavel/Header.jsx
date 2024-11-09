import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/header.css";

export default function Header({ which }) {
  const navigate = useNavigate();

  function logOut() {
    
    localStorage.clear();
    navigate("/");

  }

  const mobile_menu = (
    <div className="">

      <ul className="navLink" id="navBar">
        <li className="linkSelect"><a href="/inicio" className="link">Pessoas</a></li>
        <li className="linkSelect"><a href="#section2" className="link">Ônibus</a></li>
        <li className="linkSelect"><a href="#section3" className="link">Reservas</a></li>
        <li className="linkSelect"><a href="#section3" className="link">Sobre</a></li>
        <li className="linkSelect"><a href="#section3" className="link">Sobre</a></li>
        <li className="linkSelect"><a onClick={logOut} className="link">Sair</a></li>
      </ul>

    </div>
  );

  switch (which) {
    case 'usuario':
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="/inicio" className="link">Pessoas</a></li>
            <li className="linkSelect"><a href="#section2" className="link">Ônibus</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Reservas</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Sobre</a></li>
            <li className="linkSelect"><a href="#section3" className="link">Sobre</a></li>
            <li className="linkSelect"><a onClick={logOut} className="link">Sair</a></li>
          </ul>
        </nav>
      );
    
    case 'coordenador':
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="/inicio" className="link">Pessoas</a></li>
            <li className="linkSelect"><a href="/coordenador/onibus" className="link">Ônibus</a></li>
            <li className="linkSelect"><a href="/coordenador/reservas" className="link">Reservas</a></li>
            <li className="linkSelect"><a href="/sobre" className="link">Sobre</a></li>
            <li className="linkSelect"><a onClick={logOut} className="link">Sair</a></li>
          </ul>
        </nav>
      );

    case 'secretaria':
      return (
        <nav className="navBarWrapper" id="navBarWrapper">
          <div className="logoWrapper">
            <div className="logo">SRP</div>
          </div>
          <div className="menuIconWrapper" id="menuIconWrapper">
          </div>
          <ul className="navLink" id="navBar">
            <li className="linkSelect"><a href="/secretaria/cadastro/coordenador" className="link"> Cadastrar Coordenadores</a></li>
            <li className="linkSelect"><a href="/secretaria/cadastro/onibus" className="link">Cadastrar Onibus</a></li>
            <li className="linkSelect"><a href="/secretaria/cadastro/coordenador" className="link">Cadastrar Viajem</a></li>
            <li className="linkSelect"><a onClick={logOut} className="link">Sair</a></li>
          </ul>
        </nav>
      );
    
    default:
      return (
        <h6>
          SELECIONE O props "which" para saber que header é o utilizado
        </h6>
      );
  }

}