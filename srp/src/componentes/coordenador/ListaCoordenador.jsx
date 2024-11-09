import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import env from '/env.js';

const ListarCoordenadores = () => {
  const [coordenadores, setCoordenadores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    buscarCoordenadores();
  }, []);

  const buscarCoordenadores = async () => {
    try {
      const resposta = await axios.get(env.url.local + '/user/coordenadores');
      setCoordenadores(resposta.data);
    } catch (error) {
      console.error('Erro ao buscar coordenadores:', error);
    }
  };

  const excluirCoordenador = async (id) => {
    try {
      const confirmacao = await Swal.fire({
        title: 'Tem certeza?',
        text: 'Deseja excluir este coordenador?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, excluir',
        cancelButtonText: 'Cancelar'
      });

      if (confirmacao.isConfirmed) {
        await axios.delete(`${env.url.local}/user/coordinator/${id}`);
        setCoordenadores(coordenadores.filter(coordenador => coordenador.id !== id));
        Swal.fire('Excluído!', 'O coordenador foi excluído.', 'success');
      }
    } catch (error) {
      console.error('Erro ao excluir coordenador:', error);
    }
  };

  const verDetalhes = (id) => {
    navigate(`/coordenador/detalhes/${id}`);
  };

  const editarCoordenador = (id) => {
    navigate(`/coordenador/editar/${id}`);
  };

  return (
    <div className="listar-coordenadores">
      <h2>Lista de Coordenadores</h2>
      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>Telefone</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {coordenadores.map(coordenador => (
            <tr key={coordenador.id}>
              <td>{coordenador.nome}</td>
              <td>{coordenador.email}</td>
              <td>{coordenador.telefone}</td>
              <td>
                <button onClick={() => verDetalhes(coordenador.id)}>Ver Detalhes</button>
                <button onClick={() => editarCoordenador(coordenador.id)}>Editar</button>
                <button onClick={() => excluirCoordenador(coordenador.id)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListarCoordenadores;
