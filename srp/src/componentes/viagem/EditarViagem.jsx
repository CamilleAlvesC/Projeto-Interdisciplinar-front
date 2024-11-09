import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import env from '/env.js';

const EditarViagem = () => {
  const { id } = useParams();
  const [titulo, setTitulo] = useState('');
  const [dataIda, setDataIda] = useState('');
  const [horarioIda, setHorarioIda] = useState('');
  const [dataVolta, setDataVolta] = useState('');
  const [horarioVolta, setHorarioVolta] = useState('');
  const [embarque, setEmbarque] = useState('');
  const [desembarque, setDesembarque] = useState('');
  const [quantidadeIngressos, setQuantidadeIngressos] = useState('');
  const [mensagem, setMensagem] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchViagem = async () => {
      try {
        const resposta = await axios.get(env.url.local + `/viagem/details/${id}`);
        const dados = resposta.data;
        setTitulo(dados.titulo);
        setDataIda(dados.data_ida);
        setHorarioIda(dados.horario_ida);
        setDataVolta(dados.data_volta);
        setHorarioVolta(dados.horario_volta);
        setEmbarque(dados.embarque);
        setDesembarque(dados.desembarque);
        setQuantidadeIngressos(dados.quantidade_ingressos);
      } catch (error) {
        setMensagem(`Erro ao buscar viagem: ${error.message}`);
      }
    };

    fetchViagem();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dadosAtualizados = { titulo, data_ida: dataIda, horario_ida: horarioIda, data_volta: dataVolta, horario_volta: horarioVolta, embarque, desembarque, quantidade_ingressos };
    
    try {
      await axios.put(env.url.local + `/viagem/update/${id}`, dadosAtualizados);
      Swal.fire('Atualizado!', 'Viagem atualizada com sucesso!', 'success');
      navigate('/viagem/listar');
    } catch (error) {
      setMensagem(`Erro ao atualizar viagem: ${error.message}`);
    }
  };

  return (
    <div>
      <h2>Editar Viagem</h2>
      <form onSubmit={handleSubmit}>
        {/* Campos de edição */}
        <button type="submit">Atualizar</button>
        {mensagem && <p>{mensagem}</p>}
      </form>
    </div>
  );
};

export default EditarViagem;
