

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

//Adding tailwindcss/vite config and calling it tailwindcss()

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})