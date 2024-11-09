import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,          // Define a porta para 8080
    open: true,          // (Opcional) Abre o navegador automaticamente
    strictPort: true     // (Opcional) Não tenta outra porta se 8080 estiver em uso
  }
})