import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss()
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:3000/',
      },
      'socket.io':{
        target: 'http://backend:3000/',
        ws: true, // keep conn open for Websocket
      },
    },
  }
      // adding in just to have the socket part as well for live -andi
})
