import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    port: 3000, // Port souhaité
    host: true, // Pour accéder depuis d'autres appareils sur le réseau
  }
})
