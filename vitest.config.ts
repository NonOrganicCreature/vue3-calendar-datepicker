/// <reference types="vitest" />
import vue from '@vitejs/plugin-vue'

import { defineConfig } from 'vitest/config'
import { resolve } from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    alias: {
      "@": resolve(__dirname, "./src")
    }
  },
})