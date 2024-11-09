import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import env from '/env.js';

const ListarOnibus = () => {
  const [onibus, setOnibus] = useState([]);
  const navigate = useNavigate();

  // Função para buscar a lista de ônibus
  const buscarOnibus = async () => {
    try {
      const resposta = await axios.get(env.url.local + '/onibus');
      setOnibus(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar ônibus:', error);
    }
  };

  useEffect(() => {
    buscarOnibus();
  }, []);

  // Função para excluir ônibus
  const handleExcluir = async (id) => {
    const confirmar = await Swal.fire({
      title: 'Tem certeza?',
      text: "Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar'
    });

    if (confirmar.isConfirmed) {
      try {
        await axios.delete(env.url.local + `/onibus/${id}`);
        Swal.fire('Excluído!', 'O ônibus foi excluído com sucesso.', 'success');
        buscarOnibus(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao excluir ônibus:', error);
        Swal.fire('Erro', 'Não foi possível excluir o ônibus.', 'error');
      }
    }
  };

  return (
    <div className="listar-onibus">
      <h2>Lista de Ônibus</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Placa</th>
            <th>Modelo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {onibus.map((bus) => (
            <tr key={bus.id}>
              <td>{bus.id}</td>
              <td>{bus.placa}</td>
              <td>{bus.modelo}</td>
              <td>
                <button onClick={() => navigate(`/editar-onibus/${bus.id}`)}>Editar</button>
                <button onClick={() => navigate(`/ver-detalhes-onibus/${bus.id}`)}>Ver Detalhes</button>
                <button onClick={() => handleExcluir(bus.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarOnibus;
