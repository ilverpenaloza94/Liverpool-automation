import { defineConfig, devices } from '@playwright/test';

const fecha = new Date()
  .toISOString()
  .replace(/:/g, '-')
  .split('.')[0];

export default defineConfig({
  testDir: './tests',

  timeout: 120000,

  expect: {
    timeout: 10000,
  },

  fullyParallel: true,

  

  outputDir: `test-results/${fecha}`,

  reporter: [
    ['list'],
    [
      'html',
      {
        outputFolder: `playwright-report/${fecha}`,
        open: 'always',
      },
    ],
  ],

  use: {
    baseURL: 'https://www.liverpool.com.mx/tienda/home',

    headless: false,
    

    viewport: { width: 1920, height: 1080 },
  
    actionTimeout: 30000,

    navigationTimeout: 60000,

    trace: 'on',

    screenshot: 'on',

    video: 'on',

    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },

    {
      name: 'chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
  ],
});