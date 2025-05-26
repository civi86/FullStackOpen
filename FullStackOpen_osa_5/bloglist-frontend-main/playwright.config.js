import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './tests',
  timeout: 3000,
  retries: 0,
  use: {
    baseURL: 'http://localhost:5173',
    headless: true,
    video: 'off',
    screenshot: 'only-on-failure',
  },
})
