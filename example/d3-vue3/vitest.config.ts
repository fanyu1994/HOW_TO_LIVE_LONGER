import {defineConfig} from 'vitest/config'

export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      'assets': '/src/assets',
      'views': '/src/views',
    }
  }
})
