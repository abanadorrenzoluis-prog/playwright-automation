import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
  // Global test settings
  use: {
    baseURL: process.env.BASE_URL || '', // <-- comma here
    headless: false, // see the browser
    viewport: null, // use the full available screen size
    actionTimeout: 0, 
    launchOptions: {
      args: ['--start-maximized'], // launch browser maximized
      slowMo: 1500, // 1500ms delay between actions
    },
  },
});