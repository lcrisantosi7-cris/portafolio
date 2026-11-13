import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = env.API_PROXY_TARGET

  return {
    plugins: [react(), tailwindcss()],
    server: target ? { proxy: { '/api': { target, changeOrigin: true, secure: true } } } : undefined,
  }
})