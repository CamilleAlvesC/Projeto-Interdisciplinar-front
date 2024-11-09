import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import env from '/env.js';

const DetalhesViagem = () => {
  const { id } = useParams();
  const [viagem, setViagem] = useState(null);
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    const fetchViagem = async () => {
      try {
        const resposta = await axios.get(env.url.local + `/viagem/details/${id}`);
        setViagem(resposta.data);
      } catch (error) {
        setMensagem(`Erro ao buscar detalhes da viagem: ${error.message}`);
      }
    };

    fetchViagem();
  }, [id]);

  return (
    <div>
      <h2>Detalhes da Viagem</h2>
      {mensagem && <p>{mensagem}</p>}
      {viagem && (
        <div>
          <p>Título: {viagem.titulo}</p>
          <p>Data de Ida: {viagem.data_ida}</p>
          <p>Horário de Ida: {viagem.horario_ida}</p>
          <p>Data de Volta: {viagem.data_volta}</p>
          <p>Horário de Volta: {viagem.horario_volta}</p>
          <p>Embarque: {viagem.embarque}</p>
          <p>Desembarque: {viagem.desembarque}</p>
          <p>Quantidade de Ingressos: {viagem.quantidade_ingressos}</p>
        </div>
      )}
    </div>
  );
};

export default DetalhesViagem;
