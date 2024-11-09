import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import env from '/env.js';

const CadastroViagem = () => {
    const [titulo, setTitulo] = useState('');
    const [dataIda, setDataIda] = useState('');
    const [horarioIda, setHorarioIda] = useState('');
    const [dataVolta, setDataVolta] = useState('');
    const [horarioVolta, setHorarioVolta] = useState('');
    const [embarque, setEmbarque] = useState('');
    const [desembarque, setDesembarque] = useState('');
    const [quantidadeIngressos, setQuantidadeIngressos] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!titulo || !dataIda || !horarioIda || !dataVolta || !horarioVolta || !embarque || !desembarque || !quantidadeIngressos) {
            setMensagem('Por favor, preencha todos os campos.');
            return;
        }

        const dadosViagem = {
            titulo,
            data_ida: dataIda,
            horario_ida: horarioIda,
            data_volta: dataVolta,
            horario_volta: horarioVolta,
            embarque,
            desembarque,
            quantidade_ingressos: quantidadeIngressos,
        };

        setCarregando(true);
        setMensagem('');

        try {
            const resposta = await axios.post(env.url.local + '/viagem/register', dadosViagem);

            if (resposta.data.status === true) {
                Swal.fire({
                    title: 'Sucesso!',
                    text: 'Viagem cadastrada com sucesso!',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                }).then(() => {
                    navigate('/viagem/listar');
                });
            } else {
                setMensagem(resposta.data.message);
            }
        } catch (error) {
            setMensagem(`Erro ao cadastrar viagem: ${error.message}`);
            console.error(error);
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div>
            <h2>Cadastro de Viagem</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título" required />
                <input type="date" value={dataIda} onChange={(e) => setDataIda(e.target.value)} required />
                <input type="time" value={horaIda} onChange={(e) => setHoraIda(e.target.value)} required />
                <input type="date" value={dataVolta} onChange={(e) => setDataVolta(e.target.value)} required />
                <input type="time" value={horaVolta} onChange={(e) => setHoraVolta(e.target.value)} required />
                <input type="text" value={embarque} onChange={(e) => setEmbarque(e.target.value)} placeholder="Local de Embarque" required />
                <input type="text" value={desembarque} onChange={(e) => setDesembarque(e.target.value)} placeholder="Local de Desembarque" required />
                <input type="number" value={quantidadeIngressos} onChange={(e) => setQuantidadeIngressos(e.target.value)} placeholder="Quantidade de Ingressos" required />
                <button type="submit" disabled={carregando}>
                    {carregando ? 'Cadastrando...' : 'Cadastrar Viagem'}
                </button>
                {mensagem && <p>{mensagem}</p>}
            </form>
        </div>
    );
};

export default CadastroViagem;
