/* eslint-disable import/no-extraneous-dependencies */
import { resolve } from 'node:path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'discuss',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        '@zhengxs/gitlab-api',
        '@zhengxs/gitlab-vue',
        'axios',
        'tslib',
        'vue',
        'vitepress',
      ],
      treeshake: true,
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
