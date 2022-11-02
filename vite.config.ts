import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import eslint from 'vite-plugin-eslint'

export default defineConfig({
  base: '/feature-toggles-visual-demo/',
  plugins: [
    { ...eslint({ cache: false }), apply: 'build' },
    { ...eslint({ failOnWarning: false, failOnError: false }), apply: 'serve', enforce: 'post' },
    react()
  ]
})
