import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../styles/Cadastro.css';
import logoBus from "../../img/bus.png"; // Adicione uma imagem de ônibus
import env from '/env.js';

const CadastroOnibus = () => {
  const [placa, setPlaca] = useState('');
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [ano, setAno] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!placa || !marca || !modelo || !capacidade || !ano) {
      setMensagem('Por favor, preencha todos os campos.');
      return;
    }

    const dadosOnibus = {
      placa: placa,
      marca: marca,
      modelo: modelo,
      capacidade: capacidade,
      ano: ano
    };

    setCarregando(true);
    setMensagem('');

    try {
      const resposta = await axios.post(env.url.local + '/bus/register', dadosOnibus);

      if (resposta.data.status === true) {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Cadastro do ônibus feito com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        }).then((result) => {
          if (result.isConfirmed) {
            navigate('/secretaria/listar-onibus');
          }
        });
      } else {
        setMensagem(resposta.data.message);
      }

    } catch (error) {
      if (error.response) {
        setMensagem(`Erro: ${error.response.data.message}`);
      } else {
        setMensagem(`Erro de conexão: ${error.message}`);
      }
      console.error('Erro:', error);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="top">
        <div className="logo-form">
          <img src={logoBus} alt="Ônibus"></img>
        </div>
        <h2>Cadastro de Ônibus</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Placa:</label>
          <input 
            type="text"
            value={placa}
            onChange={(e) => setPlaca(e.target.value)}
            required
            placeholder="Placa do ônibus"
          />
        </div>

        <div className="input-group">
          <label>Marca:</label>
          <input 
            type="text"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
            placeholder="Marca do ônibus"
          />
        </div>

        <div className="input-group">
          <label>Modelo:</label>
          <input 
            type="text"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
            placeholder="Modelo do ônibus"
          />
        </div>

        <div className="input-group">
          <label>Capacidade:</label>
          <input 
            type="number"
            value={capacidade}
            onChange={(e) => setCapacidade(e.target.value)}
            required
            placeholder="Capacidade de passageiros"
          />
        </div>

        <div className="input-group">
          <label>Ano:</label>
          <input 
            type="number"
            value={ano}
            onChange={(e) => setAno(e.target.value)}
            required
            placeholder="Ano de fabricação"
          />
        </div>

        <button type="submit" disabled={carregando} className='btn-cadastro'>
          {carregando ? 'Cadastrando...' : 'Cadastrar'}
        </button>

        {mensagem && <p className="mensagem">{mensagem}</p>}
      </form>
    </div>
  );
};

export default CadastroOnibus;
