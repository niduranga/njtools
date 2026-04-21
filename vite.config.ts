import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";
import prerender from 'vite-plugin-prerender'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolRoutes = [
  '/',
  '/tools/svg-to-png',
  '/tools/json-formatter',
  '/tools/unit-converter'
];

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    prerender({
      staticDir: path.join(__dirname, 'dist'),
      routes: toolRoutes,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})