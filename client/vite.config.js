import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Dev server options - allow specific hosts (useful when exposing dev server)
  server: {
    // allow network access to the dev server
    host: true,
    port: 5173,
    // allowedHosts can include hostnames or patterns. Add your production preview domain
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      '0.0.0.0',
      'imagify-frontend-wfes.onrender.com',
      '.onrender.com'
    ],
    hmr: {
      // adjust HMR host if needed when accessing from other machines
      host: 'localhost'
    }
  }
})
