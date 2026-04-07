import {defineConfig} from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

export default defineConfig({
    // Global test settings
    use: {
        baseURL: process.env.BASE_URL || '' 
    }
});