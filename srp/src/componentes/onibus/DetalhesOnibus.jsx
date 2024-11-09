import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import env from '/env.js';

const VerDetalhesOnibus = () => {
  const { id } = useParams();
  const [onibus, setOnibus] = useState(null);
  const [mensagem, setMensagem] = useState('');

  // Função para buscar os detalhes do ônibus
  const buscarDetalhesOnibus = async () => {
    try {
      const resposta = await axios.get(env.url.local + `/onibus/${id}`);
      setOnibus(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar detalhes do ônibus:', error);
      setMensagem('Erro ao carregar os detalhes.');
    }
  };

  useEffect(() => {
    buscarDetalhesOnibus();
  }, [id]);

  if (mensagem) {
    return <p>{mensagem}</p>;
  }

  return (
    <div className="detalhes-onibus">
      <h2>Detalhes do Ônibus</h2>
      {onibus ? (
        <div>
          <p><strong>ID:</strong> {onibus.id}</p>
          <p><strong>Placa:</strong> {onibus.placa}</p>
          <p><strong>Modelo:</strong> {onibus.modelo}</p>
          <p><strong>Capacidade:</strong> {onibus.capacidade}</p>
          <p><strong>Motorista:</strong> {onibus.motorista}</p>
          {/* Adicione outros detalhes conforme necessário */}
        </div>
      ) : (
        <p>Carregando detalhes...</p>
      )}
    </div>
  );
};

export default VerDetalhesOnibus;
