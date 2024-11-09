import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Secretaria.css';
import env from '/env.js';

const DetalhesCoordenador = () => {
  const { id } = useParams();  // Obtém o ID do coordenador da URL
  const [coordenador, setCoordenador] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const buscarCoordenador = async () => {
      try {
        const resposta = await axios.get(`${env.url.local}/user/${id}`);
        setCoordenador(resposta.data);
      } catch (error) {
        setMensagem('Erro ao buscar os detalhes do coordenador.');
        console.error(error);
      }
    };
    
    buscarCoordenador();
  }, [id]);

  return (
    <div className="detalhes-coordenador">
      <h2>Detalhes do Coordenador</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      {coordenador ? (
        <div className="detalhes-conteudo">
          <p><strong>Nome:</strong> {coordenador.nome}</p>
          <p><strong>Email:</strong> {coordenador.email}</p>
          <p><strong>CEP:</strong> {coordenador.cep}</p>
          <p><strong>Rua:</strong> {coordenador.rua}</p>
          <p><strong>Bairro:</strong> {coordenador.bairro}</p>
          <p><strong>Cidade:</strong> {coordenador.cidade}</p>
          <p><strong>CPF:</strong> {coordenador.cpf}</p>
          <p><strong>RG:</strong> {coordenador.rg}</p>
          <p><strong>Telefone:</strong> {coordenador.telefone}</p>
          <p><strong>Paróquia:</strong> {coordenador.paroquia}</p>
          <button onClick={() => navigate(-1)} className="btn-voltar">Voltar</button>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default DetalhesCoordenador;
