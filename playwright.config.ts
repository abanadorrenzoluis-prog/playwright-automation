import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  // Global test settings
  use: {
    baseURL: process.env.BASE_URL || '', 
    headless: process.env.CI ? true : false, // If in CI, run at full speed. Locally, run with UI and with a delay between actions for better visibility during development.
    viewport: null, // use the full available screen size
    actionTimeout: 0, 
    launchOptions: {
      args: ['--start-maximized'], // launch browser maximized
      slowMo: process.env.CI ? 0 : 1500, // If in CI, run at full speed. Locally, use 1500ms to delay between actions
    },
  },
});
