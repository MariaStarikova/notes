import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      includeAssets: ['note.svg', 'offline.html', 'offline.scss', 'sw.js'],
      manifest: {
        name: 'Markdown Editor - Редактор заметок',
        short_name: 'MD Editor',
        start_url: '/index.html',
        description: 'Простой и удобный редактор markdown заметок с предварительным просмотром',
        display: 'standalone',
        id: 'https://notes-3a3aa.web.app/',
        background_color: '#ffffff',
        theme_color: '#0070f3',
        orientation: 'portrait-primary',
        icons: [
          {
            src: '/icons/note-48.png',
            type: 'image/png',
            sizes: '48x48'
          },
          {
            src: '/icons/note-72.png',
            type: 'image/png',
            sizes: '72x72'
          },
          {
            src: '/icons/note-96.png',
            type: 'image/png',
            sizes: '96x96'
          },
          {
            src: '/icons/note-128.png',
            type: 'image/png',
            sizes: '128x128'
          },
          {
            src: '/icons/note-144.png',
            type: 'image/png',
            sizes: '144x144'
          },
          {
            src: '/icons/note-152.png',
            type: 'image/png',
            sizes: '152x152'
          },
          {
            src: '/icons/note-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: '/icons/note-284.png',
            type: 'image/png',
            sizes: '284x284'
          },
          {
            src: '/icons/note-512.png',
            type: 'image/png',
            sizes: '512x512'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/app/styled/main.scss" as *;`
      }
    }
  }
});
