import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            'styled-jsx/babel',
            {
              plugins: [
                [
                  '@styled-jsx/plugin-sass',
                  {
                    sassOptions: { includePaths: ['src'] },
                  },
                ],
              ],
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@constants': path.resolve(__dirname, './src/constants'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@services': path.resolve(__dirname, './src/services'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@zus': path.resolve(__dirname, './src/zustand'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules') || id.endsWith('.css')) return
          if (id.includes('/framer-motion/') || id.includes('/react-spring/') || id.includes('/animejs/')) {
            return 'motion-vendor'
          }
          if (id.includes('/lodash/') || id.includes('/moment/')) {
            return 'data-vendor'
          }
          if (id.includes('/howler/')) {
            return 'audio-vendor'
          }
        },
      },
    },
  },
})
