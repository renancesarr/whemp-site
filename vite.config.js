import { defineConfig } from 'vite'
import path from 'path'
import dotenv from 'dotenv'

// Carregar variáveis de ambiente do arquivo .env
dotenv.config()

export default defineConfig({
  root: './src',
  build: {
    outDir: path.resolve(__dirname, process.env.BUILD_DIR || 'releases/latest'),
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'),
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
