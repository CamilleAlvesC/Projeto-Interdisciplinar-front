  // src/components/Cadastro.jsx
  import React, { useState } from 'react';
  import axios from 'axios';
  import Swal from 'sweetalert2';
  import { useNavigate } from 'react-router-dom';  // Importando o hook useNavigate
  import '../styles/Cadastro.css';    
  import logoSol from "../img/Sun (1).png";
  import env from '/env.js';

  const Cadastro = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cep, setCep] = useState('');
    const [rua, setRua] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [rg, setRg] = useState('');
    const [telefone, setTelefone] = useState('');
    const [mensagem, setMensagem] = useState('');
    const [carregando, setCarregando] = useState(false);

    const navigate = useNavigate();  // Inicializando o hook

    // Função para buscar endereço pelo CEP
    const buscarEndereco = async (cep) => {

      try {

        const resposta = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

        if (resposta.data.erro) {
          setMensagem('CEP não encontrado.');
          setRua('');
          setBairro('');
          setCidade('');
        } else {
          setRua(resposta.data.logradouro);
          setBairro(resposta.data.bairro);
          setCidade(resposta.data.localidade);
          setMensagem('');
        }
      } catch (error) {
        setMensagem('Erro ao buscar o CEP.');
        console.error('Erro ao buscar CEP:', error);
      }
    };

    const handleCepChange = (e) => {

      const valorCep = e.target.value.replace(/\D/g, '');

      setCep(valorCep);

      if (valorCep.length === 8) {
        buscarEndereco(valorCep);
      } else {
        setRua('');
        setBairro('');
        setCidade('');
      }

    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (!nome || !email || !senha || !cep || !rua || !bairro || !cidade || !cpf || !rg || !telefone) {
        setMensagem('Por favor, preencha todos os campos.');
        return;
      }

      const dadosUsuario = {
        nome: nome,
        email: email,
        senha: senha,
        rua: rua,
        bairro: bairro,
        cidade: cidade,
        cpf: cpf,
        rg: rg,
        telefone: telefone,
        adm: 0,
        id_paroquia: null
      };
      
      setCarregando(true);
      setMensagem('');

      try {

        const resposta = await axios.post(env.url.local + '/user/register', dadosUsuario);
        
        if (resposta.data.status == true) {

          Swal.fire({
            title: 'Sucesso!',
            text: 'Cadastro Feito com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then((result) => {
  
            if (result.isConfirmed) {
              
              navigate('/login', { state: { recemRegistrado: true } })
  
            }
  
          }); 

        }else{

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
              <img src={logoSol} alt="Profile"></img>
            </div>
            <h2>Cadastro Usuário</h2>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Nome:</label>
              <input 
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Senha:</label>
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>CEP:</label>
              <input
                type="text"
                value={cep}
                onChange={handleCepChange}
                maxLength="8"
                required
                placeholder="Somente números"
              />
            </div>
            <div className="input-group">
              <label>Rua:</label>
              <input
                type="text"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
                required
                placeholder="Digite seu CEP"
                disabled={rua == ''}
              />
            </div>
            <div className="input-group">
              <label>Bairro:</label>
              <input
                type="text"
                value={bairro}
                onChange={(e) => setBairro(e.target.value)}
                required
                placeholder="Digite seu CEP"
                disabled={bairro == ''}
              />
            </div>
            <div className="input-group">
              <label>Cidade:</label>
              <input
                type="text"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
                required
                placeholder="Digite seu CEP"
                disabled={cidade == ''}
              />
            </div>
            <div className="input-group">
              <label>CPF:</label>
              <input
                type="text"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
                maxLength="11"
                placeholder="Apenas números"
              />
            </div>
            <div className="input-group">
              <label>RG:</label>
              <input
                type="text"
                value={rg}
                onChange={(e) => setRg(e.target.value)}
                required
                maxLength="9"
                placeholder="Apenas números"
              />
            </div>
            <div className="input-group">
              <label>Telefone:</label>
              <input
                type="text"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                required
                maxLength="11"
                placeholder="Apenas números"
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

  export default Cadastro;
