
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  server: {
    allowedHosts: true,
  },
  // plugins: [

  //   react(),

  //   VitePWA({
  //     devOptions: {
  //       enabled: true,
  //     },

  //     registerType: 'autoUpdate',

  //     manifest: {
  //       name: 'My React App',
  //       short_name: 'My App',
  //       description: 'React PWA',
  //       theme_color: '#ffffff',
  //       background_color: '#ffffff',
  //       display: 'standalone',
  //       start_url: '/',
  //     },
  //   }),
  // ],
})
