
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  plugins: [

    react(),

    VitePWA({
      devOptions: {
        enabled: true,
      },

      registerType: 'autoUpdate',

      manifest: {
        name: 'Block puzzle',
        short_name: 'Block puzzle',
        description: 'game',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
      },
    }),
  ],
  base: '/block-puzzle/',
})
