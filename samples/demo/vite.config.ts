/* eslint-disable import/no-extraneous-dependencies */
import path from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import topLevelAwait from "vite-plugin-top-level-await";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), topLevelAwait()],
  resolve: {
    alias: [
      {
        find: /~(.+)/,
        replacement: path.resolve(__dirname, 'node_modules/$1'),
      },
    ],
  },
})
