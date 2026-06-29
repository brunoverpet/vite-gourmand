import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import adonisjs from '@adonisjs/vite/client'
import inertia from '@adonisjs/inertia/vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    inertia({ ssr: { enabled: false, entrypoint: 'inertia/ssr.tsx' } }),
    adonisjs({ entrypoints: ['inertia/app.tsx'], reload: ['resources/views/**/*.edge'] }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '@': `${new URL('./inertia/', import.meta.url).pathname}`,
      '~/': `${import.meta.dirname}/inertia/`,
      '@pages': `${new URL('./inertia/pages', import.meta.url).pathname}`,
      '@hooks': `${new URL('./inertia/lib/hooks', import.meta.url).pathname}`,
      '@utils': `${new URL('./inertia/lib/utils', import.meta.url).pathname}`,
      '@generated': `${import.meta.dirname}/.adonisjs/client/`,
    },
  },

  server: {
    watch: {
      ignored: ['**/storage/**', '**/tmp/**'],
    },
  },
})
