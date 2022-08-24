import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      'assets': '/src/assets',
      'views': '/src/views',
    },
  },
  plugins: [
    vue(),
    Unocss({
      presets: [
        presetAttributify(),
        presetUno(),
        presetIcons(),
      ],
      rules: [
        ['fit-content', { width: 'fit-content' }],
      ],
      shortcuts: [
        // you could still have object style
        {
          btn: 'py-2 px-4 font-semibold rounded-lg shadow-md',
        },
        // dynamic shortcuts
        [/^btn-(.*)$/, ([, c]) => `bg-${c}-400 text-${c}-100 py-2 px-4 rounded-lg`],
      ]
    })
  ]
})
