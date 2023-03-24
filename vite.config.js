import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => tag.startsWith('md-')
      }
    }
  }), vueJsx()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  // server: {
  //   open: true,
  //   cors: true,
  //   proxy: {
  //     '/api': 'http://localhost/'
  //   },
  // },

  base: '/To-Do',
  build: {
    outDir: './docs'
  }
})
