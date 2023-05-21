import { config } from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

config();

export default defineConfig({
  plugins: [svgr(), react()],
  server: {
    host: true,
    port: 3000,
    proxy: { '/trpc': { target: process.env.SERVER_URL } },
  },
});
