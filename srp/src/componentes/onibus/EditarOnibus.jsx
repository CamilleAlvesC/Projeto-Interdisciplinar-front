import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Secretaria.css';

const EditarOnibus = () => {
  const { id } = useParams(); // Obtém o ID do ônibus a partir da URL
  const navigate = useNavigate();

  const [dadosOnibus, setDadosOnibus] = useState({
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    assentos: '',
    motorista: {
      nome: '',
      cpf: '',
      rg: '',
      dataNascimento: '',
    },
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para buscar os dados do ônibus com base no ID
  useEffect(() => {
    const fetchOnibus = async () => {
      try {
        const response = await fetch('/src/serve/onibus.json'); // Ajuste o caminho conforme necessário
        if (!response.ok) {
          throw new Error('Erro ao carregar ônibus');
        }
        const data = await response.json();

        // Busca o ônibus específico pelo ID
        const onibusEncontrado = data.find(onibus => onibus.id === parseInt(id));
        
        if (onibusEncontrado) {
          setDadosOnibus(onibusEncontrado);
        } else {
          setError('Ônibus não encontrado.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar ônibus:', err);
        setError('Erro ao carregar os dados do ônibus.');
        setLoading(false);
      }
    };

    fetchOnibus();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name in dadosOnibus.motorista) {
      setDadosOnibus({
        ...dadosOnibus,
        motorista: {
          ...dadosOnibus.motorista,
          [name]: value,
        },
      });
    } else {
      setDadosOnibus({
        ...dadosOnibus,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtém todos os ônibus para atualizar
      const response = await fetch('/src/serve/onibus.json');
      const data = await response.json();

      // Atualiza o ônibus com os novos dados
      const onibusAtualizado = { ...dadosOnibus, id: parseInt(id) };
      const novosOnibus = data.map(onibus =>
        onibus.id === onibusAtualizado.id ? onibusAtualizado : onibus
      );

      // Salva as mudanças no arquivo JSON (simulação)
      await fetch('/src/serve/onibus.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novosOnibus),
      });

      alert('Ônibus atualizado com sucesso!');
      navigate('/secretaria/crudonibus'); // Redireciona de volta para a lista
    } catch (err) {
      console.error('Erro ao atualizar ônibus:', err);
      alert('Erro ao atualizar o ônibus.');
    }
  };

  if (loading) {
    return <p>Carregando dados...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container-editar">
      <h2>Editar Ônibus</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="placa">Placa</label>
        <input 
          type="text" 
          name="placa" 
          value={dadosOnibus.placa} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="marca">Marca</label>
        <input 
          type="text" 
          name="marca" 
          value={dadosOnibus.marca} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="modelo">Modelo</label>
        <input 
          type="text" 
          name="modelo" 
          value={dadosOnibus.modelo} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="ano">Ano</label>
        <input 
          type="number" 
          name="ano" 
          value={dadosOnibus.ano} 
          onChange={handleChange} 
          required 
          min="1900" 
          max={new Date().getFullYear()} 
        />

        <label htmlFor="assentos">Quantidade de Assentos</label>
        <input 
          type="number" 
          name="assentos" 
          value={dadosOnibus.assentos} 
          onChange={handleChange} 
          required 
          min="1" 
        />

        <h3>Dados do Motorista</h3>
        <label htmlFor="nome">Nome do Motorista</label>
        <input 
          type="text" 
          name="nome" 
          value={dadosOnibus.motorista.nome} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="cpf">CPF</label>
        <input 
          type="text" 
          name="cpf" 
          value={dadosOnibus.motorista.cpf} 
          onChange={handleChange} 
          required 
          maxLength="11" 
        />

        <label htmlFor="rg">RG</label>
        <input 
          type="text" 
          name="rg" 
          value={dadosOnibus.motorista.rg} 
          onChange={handleChange} 
          required 
          maxLength="9" 
        />

        <label htmlFor="dataNascimento">Data de Nascimento</label>
        <input 
          type="date" 
          name="dataNascimento" 
          value={dadosOnibus.motorista.dataNascimento} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={() => navigate('/secretaria')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarOnibus;
