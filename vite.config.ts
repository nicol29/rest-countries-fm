import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/rest-countries-fm",
  plugins: [react()],
  resolve: {
    alias: {
      '@icons': '/src/assets/images/icons',
    },
  },
})
