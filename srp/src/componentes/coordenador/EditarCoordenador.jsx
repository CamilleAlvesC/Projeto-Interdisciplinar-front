import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../styles/Secretaria.css';

const EditarCoordenador = () => {
  const { id } = useParams();  // Pega o ID da URL
  const navigate = useNavigate();

  const [coordenador, setCoordenador] = useState({
    nome: '',
    email: '',
    funcao: ''
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Busca os dados do coordenador com base no ID
    const fetchCoordenador = async () => {
      try {
        const response = await fetch('/src/serve/coordenadores.json');  // Ajuste o caminho conforme necessário
        if (!response.ok) {
          throw new Error('Erro ao carregar coordenador');
        }
        const data = await response.json();
        
        // Busca o coordenador específico pelo ID
        const coordenadorEncontrado = data.find(coor => coor.id === parseInt(id));
        
        if (coordenadorEncontrado) {
          setCoordenador(coordenadorEncontrado);
        } else {
          setError('Coordenador não encontrado.');
        }
        setLoading(false);
      } catch (err) {
        console.error('Erro ao buscar coordenador:', err);
        setError('Erro ao carregar os dados do coordenador.');
        setLoading(false);
      }
    };

    fetchCoordenador();
  }, [id]);

  const handleChange = (e) => {
    setCoordenador({
      ...coordenador,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Obtém todos os coordenadores para atualizar
      const response = await fetch('/src/serve/coordenadores.json');
      const data = await response.json();

      // Atualiza o coordenador com os novos dados
      const coordenadorAtualizado = { ...coordenador, id: parseInt(id) };
      const novosCoordenadores = data.map(coor =>
        coor.id === coordenadorAtualizado.id ? coordenadorAtualizado : coor
      );

      // Salva as mudanças no arquivo JSON (simulação)
      await fetch('/src/serve/coordenadores.json', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novosCoordenadores),
      });

      alert('Coordenador atualizado com sucesso!');
      navigate('/secretaria/crudcoordenador');  // Redireciona de volta para a lista
    } catch (err) {
      console.error('Erro ao atualizar coordenador:', err);
      alert('Erro ao atualizar o coordenador.');
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
      <h2>Editar Coordenador</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome</label>
        <input 
          type="text" 
          name="nome" 
          value={coordenador.nome} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          name="email" 
          value={coordenador.email} 
          onChange={handleChange} 
          required 
        />

        <label htmlFor="funcao">Função</label>
        <input 
          type="text" 
          name="funcao" 
          value={coordenador.funcao} 
          onChange={handleChange} 
          required 
        />

        <button type="submit">Salvar Alterações</button>
        <button type="button" onClick={() => navigate('/secretaria')}>Cancelar</button>
      </form>
    </div>
  );
};

export default EditarCoordenador;
