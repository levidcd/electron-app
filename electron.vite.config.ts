import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        // '@pixi/core': join(__dirname, 'node_modules/@pixi/core'),
        // 'pixi.js': join(__dirname, 'node_modules/pixi.js')
      }
    },
    plugins: [react()]
  }
})
