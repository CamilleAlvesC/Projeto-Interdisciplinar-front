// src/mocks/axiosMock.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Criar uma instância do MockAdapter
const mock = new MockAdapter(axios, { delayResponse: 500 }); // Opcional: delay para simular rede

// Mockar o endpoint de login
mock.onPost('https://a3c8-2804-7f0-a218-1f0d-2814-49d6-7583-3181.ngrok-free.app/auth/').reply((config) => {
  const { email, senha } = JSON.parse(config.data);
  if (email === 'isaias@example.com' && senha === 'senha123') {
    return [200, { token: 'fake-jwt-token' }];
  } else {
    return [401, 'Email ou senha inválidos.'];
  }
});

// Mockar o endpoint de cadastro
mock.onPost('https://a3c8-2804-7f0-a218-1f0d-2814-49d6-7583-3181.ngrok-free.app/user/register').reply((config) => {
  const { email } = JSON.parse(config.data);
  if (email === 'isaias@example.com') {
    return [400, 'Usuário já cadastrado.'];
  } else {
    return [200, 'Cadastro realizado com sucesso.'];
  }
});

// Mockar o endpoint de perfil
// mock.onGet('http://localhost:5173/api/auth/profile').reply((config) => {
//   const authHeader = config.headers['Authorization'];
//   if (authHeader === 'Bearer fake-jwt-token') {
//     return [200, { nome: 'Isaias Sorriso', email: 'isaias@example.com' }];
//   } else {
//     return [401, 'Token de autenticação inválido.'];
//   }
// });

export default mock;
