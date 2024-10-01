import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    sourcemap: true
  },
  optimizeDeps: {
    include: ['@react-three/fiber', 'three', 'gsap', '@react-three/drei'],
  },
})