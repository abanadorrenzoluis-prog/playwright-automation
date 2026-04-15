import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  // Global test settings
  use: {
    baseURL: process.env.BASE_URL || '', 
    headless: process.env.CI ? true : false, // If in CI, run headless. Locally, run with the browser UI visible; action speed is controlled by `slowMo` below.
    viewport: {width: 1920, height: 1080}, // use a consistent browser size in both CI headless runs and local execution
    actionTimeout: 0, 
    launchOptions: {
      slowMo: process.env.CI ? 0 : 500, // If in CI, run at full speed. Locally, use 500ms to delay between actions
    },
  },
});
