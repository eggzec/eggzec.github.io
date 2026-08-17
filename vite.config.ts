import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { htmlPartials } from './vite-plugin-partials'

const r = (...p: string[]) => resolve(__dirname, ...p)

/**
 * eggzec.github.io is an *organization root* Pages site, so the deployed base
 * path is `/`. Every page is a real directory + index.html so GitHub Pages can
 * serve clean URLs (`/projects/`) without a rewrite layer.
 */
export default defineConfig({
  base: '/',
  appType: 'mpa',
  plugins: [htmlPartials(__dirname)],
  resolve: {
    alias: { '@': r('src') },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2022',
    cssTarget: 'chrome111',
    assetsInlineLimit: 2048,
    rollupOptions: {
      input: {
        home: r('index.html'),
        projects: r('projects/index.html'),
        community: r('community/index.html'),
        notFound: r('404.html'),
      },
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
  },
  server: {
    port: 5173,
  },
})
