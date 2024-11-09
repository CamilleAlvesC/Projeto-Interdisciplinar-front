// src/mocks/handlers.js
import { rest } from 'msw';

export const handlers = [
  // Handler para o login
  rest.post('http://localhost:5173/api/auth/login', (req, res, ctx) => {
    const { email, senha } = req.body;

    if (email === 'isaias@example.com' && senha === 'senha123') {
      return res(
        ctx.status(200),
        ctx.json({ token: 'fake-jwt-token' })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json('Email ou senha inválidos.')
      );
    }
  }),

  // Handler para o cadastro
  rest.post('http://localhost:5173/api/auth/register', (req, res, ctx) => {
    const { email } = req.body;

    if (email === 'isaias@example.com') {
      return res(
        ctx.status(400),
        ctx.json('Usuário já cadastrado.')
      );
    } else {
      return res(
        ctx.status(200),
        ctx.json('Cadastro realizado com sucesso.')
      );
    }
  }),

  // Handler para obter perfil
  rest.get('http://localhost:5173/api/auth/profile', (req, res, ctx) => {
    const authHeader = req.headers.get('Authorization');

    if (authHeader === 'Bearer fake-jwt-token') {
      return res(
        ctx.status(200),
        ctx.json({ nome: 'Isaias Sorriso', email: 'isaias@example.com' })
      );
    } else {
      return res(
        ctx.status(401),
        ctx.json('Token de autenticação inválido.')
      );
    }
  }),
];
