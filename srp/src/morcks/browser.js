// src/mocks/browser.js
import { setupWorker } from 'msw';
import { handlers } from './handlers';

// Configura o Service Worker com os handlers
export const worker = setupWorker(...handlers);
