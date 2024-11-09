import React from 'react';
import '../styles/Desenvolvedores.css'; // Arquivo CSS para estilização
import '../styles/Global.css'; // Arquivo CSS para estilização
import Header from './Header';
import isaias from "../img/foto-isaias.png";
import camille from "../img/foto-camille.png";
import gustavo from "../img/foto-gustavo.png";
import victor from "../img/foto-victor.png";
import arthur from "../img/foto-arthur.png";
import { FaLinkedin, FaGithub } from 'react-icons/fa'; // Ícones do LinkedIn e GitHub

const desenvolvedores = [
  {
    nome: 'Isaías Belarmina',
    cargo: 'Product Owner & Front-end',
    img: isaias, 
    linkedin: '#',
    github: '#',
  },
  {
    nome: 'Camille Alves',
    cargo: 'Scrum Master, UI/UX & Front-end',
    img: camille, 
    linkedin: '#',
    github: '#',
  },
  {
    nome: 'Gustavo Henrique',
    cargo: 'Banco de Dados',
    img: gustavo, 
    linkedin: '#',
    github: '#',
  },
  {
    nome: 'Victor Daniel',
    cargo: 'Back-end',
    img: victor, 
    linkedin: '#',
    github: '#',
  },
  {
    nome: 'Arthur Soares',
    cargo: 'Banco de Dados',
    img: arthur, 
    linkedin: '#',
    github: '#',
  },
];

const Desenvolvedores = () => {
  return (
    <div className="desenvolvedores-container">
        
    < Header/>

      <h2>Desenvolvedores</h2>
      <div className="dev-grid">
        {desenvolvedores.map((dev, index) => (
          <div key={index} className="dev-card">
            <img src={dev.img} alt={dev.nome} className="dev-img" />
            <div className="info-dev">
            <h3>{dev.nome}</h3>
            <p>{dev.cargo}</p>
            <div className="dev-links">
              <a href={dev.linkedin} target="_blank" rel="noopener noreferrer">
                <FaLinkedin size={30} />
              </a>
              <a href={dev.github} target="_blank" rel="noopener noreferrer">
                <FaGithub size={30} />
              </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Desenvolvedores;
