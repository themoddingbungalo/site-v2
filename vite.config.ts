import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH is "/site-v2/" on the GitHub Pages project URL and "/" once the
// site is served from the root of a custom domain. The deploy workflow sets it
// from actions/configure-pages, so nothing here needs editing when that moves.
const base = process.env.VITE_BASE_PATH || '/'

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  build: {
    // hero images and markdown chunks push some assets over the default 500 kB warning
    chunkSizeWarningLimit: 900,
  },
})
