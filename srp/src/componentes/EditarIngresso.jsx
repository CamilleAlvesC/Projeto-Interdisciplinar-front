import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditarIngresso = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ingresso, setIngresso] = useState({
    titulo: "",
    dataIda: "",
    horarioIda: "",
    dataVolta: "",
    horarioVolta: "",
    destinoFinal: "",
    lugarEmbarque: "",
    preco: 0,
  });

  useEffect(() => {
    const fetchIngresso = async () => {
      try {
        const response = await axios.get(`https://2a41-2804-7f0-a218-110c-d037-c4c4-613-19c5.ngrok-free.app/${id}`);
        setIngresso(response.data);
      } catch (error) {
        console.error("Erro ao buscar ingresso:", error);
      }
    };

    fetchIngresso();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIngresso({ ...ingresso, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://2a41-2804-7f0-a218-110c-d037-c4c4-613-19c5.ngrok-free.app/${id}`, ingresso);
      alert("Ingresso atualizado com sucesso!");
      navigate("/secretaria/listar-ingressos"); // Navegar de volta após edição
    } catch (error) {
      console.error("Erro ao atualizar ingresso:", error);
      alert("Erro ao atualizar ingresso.");
    }
  };

  return (
    <div className="container">
      <h1>Editar Ingresso</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={ingresso.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Destino Final</label>
          <input
            type="text"
            name="destinoFinal"
            value={ingresso.destinoFinal}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Ida</label>
          <input
            type="date"
            name="dataIda"
            value={ingresso.dataIda}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Horário de Ida</label>
          <input
            type="time"
            name="horarioIda"
            value={ingresso.horarioIda}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Data de Volta</label>
          <input
            type="date"
            name="dataVolta"
            value={ingresso.dataVolta}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Horário de Volta</label>
          <input
            type="time"
            name="horarioVolta"
            value={ingresso.horarioVolta}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Lugar de Embarque</label>
          <input
            type="text"
            name="lugarEmbarque"
            value={ingresso.lugarEmbarque}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Preço</label>
          <input
            type="number"
            name="preco"
            value={ingresso.preco}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Atualizar Ingresso</button>
      </form>
    </div>
  );
};

export default EditarIngresso;
