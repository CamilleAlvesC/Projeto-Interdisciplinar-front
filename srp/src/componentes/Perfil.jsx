// src/components/Profile.jsx
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import '../styles/Perfil.css';
import imgprofile from '../img/perfil.png';
import imgIngresso from '../img/image 2.png';
import logoSrp from '../img/SRP Viagens.png';
import logoSol from '../img/Sun.png';
import { useNavigate } from 'react-router-dom'; 

const Profile = () => {

  const navigate = useNavigate();  // Inicializando o hook

  const handleCancel = () => {
    navigate('/perfil/cancelamento');  // Redireciona para a página de login
  };

  const handleLogout = () => {
      Swal.fire({
        title: 'Sucesso!',
        text: 'Você Deslogou',
        icon: 'success',
        confirmButtonText: 'Ok'
      }); 
    navigate('/');  // Redireciona para a página de login
  };
  // const [usuario, setUsuario] = useState(null); // Estado para armazenar os dados do usuário

  // // Função para buscar dados do usuário da API
  // const fetchUserData = async () => {
  //   try {
  //     const response = await fetch('https://a3f8-2804-7f0-a218-110c-5dda-9acb-8dc3-272d.ngrok-free.app/auth'); // Substitua pela URL da sua API
  //     if (!response.ok) {
  //       throw new Error('Erro ao buscar os dados do usuário');
  //     }
  //     const data = await response.json(); // Converte a resposta para JSON
  //     setUsuario(data); // Define os dados do usuário
  //   } catch (error) {
  //     console.error('Erro ao buscar os dados:', error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);


 

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src={logoSol} alt="Logo Sol" />
          <img src={logoSrp} alt="Logo SRP" />
        </div>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="">Sobre</a></li>
          <li><a href="">Viagem</a></li>
          <li><a href="">Cancelamento</a></li>
          <li><a href="">Ajuda</a></li>
        </ul>
      </header>
      <div className="profile">
        <div className="profile-img-info">
          <div className="img-profile">
            <img src={imgprofile} alt="Profile" />
          </div>
          <div className="profile-info">
            <h2>Isaias B. de Souza</h2>
            <p>isaiaslindo@gmail.com</p>
          </div>
        </div>
        <div className="btn">
        <button className="edit-btn">Editar</button>
        <button className="edit-btn" onClick={handleLogout}>Sair</button>
        </div>
      </div>

      <div className="tickets-section">
        <h3>Ingressos:</h3>
        <div className="ticket">
          <div className="ticket-info">
            <p><strong>Isaias B. Souza</strong></p>
            <p>Local de Embarque: Paróquia São Benedito</p>
            <p>Local de Chegada: Aparecida do Norte</p>
            <p>Data: 10/10/2024</p>
            <p>Horário: 13:30 até as 22:00</p>
          </div>
          <div className="img-ingresso">
            <img src={imgIngresso} alt="Ingresso" />
          </div>
          <button className="cancel-btn" onClick={handleCancel}>Cancelamento</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
