import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import env from '/env.js';

const ListarViagens = () => {
  const [viagens, setViagens] = useState([]);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchViagens = async () => {
      try {
        const resposta = await axios.get(env.url.local + '/viagem/list');
        setViagens(resposta.data);
      } catch (error) {
        setMensagem(`Erro ao buscar viagens: ${error.message}`);
      }
    };

    fetchViagens();
  }, []);

  return (
    <div>
      <h2>Lista de Viagens</h2>
      {mensagem && <p>{mensagem}</p>}
      <ul>
        {viagens.map((viagem) => (
          <li key={viagem.id}>
            {viagem.titulo}
            <Link to={`/viagem/detalhes/${viagem.id}`}>Ver Detalhes</Link>
            <Link to={`/viagem/editar/${viagem.id}`}>Editar</Link>
            <button onClick={() => handleExcluirViagem(viagem.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListarViagens;
