import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg'],
      manifest: {
        name: 'Wavedash',
        id: '/',
        short_name: 'Wavedash',
        theme_color: '#007bff',
        icons: [
          {
            src: 'web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        display: 'standalone',
        scope: '/',
        start_url: '/',
        description: 'See at a glance when\'s best for sailing and swimming with Wavedash!',
        screenshots: [
          {
            src: 'screenshot-desktop.png',
            sizes: '1854x993',
            type: 'image/png',
            form_factor: 'wide',
          },
          {
            src: 'screenshot-mobile.png',
            sizes: '800x1732',
            type: 'image/png',
            form_factor: 'narrow',
          },
        ],
        launch_handler: {
          'client_mode': 'auto',
        },
        orientation: 'any',
        'display_override': [
          'standalone',
          'window-controls-overlay'
        ],
        'categories': [
          'utilities',
          'weather'
        ],
        dir: 'ltr',
        prefer_related_applications: false,
      }
    }),
  ],
  base: '/'
})
