import {test} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {HomePage} from '../../pages-playwright/HomePage';
import {SettingsPage} from '../../pages-playwright/SettingsPage';
import {getEnvVar} from '../utils/env';


// Load valid credentials from .env
const VALID_USERNAME = getEnvVar('VALID_USERNAME');
const VALID_PASSWORD = getEnvVar('VALID_PASSWORD');

test.describe('Logout Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let settingsPage: SettingsPage;

    // Setup before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        settingsPage = new SettingsPage(page);
        await loginPage.goToLoginPage(10000);
        await loginPage.loginAndSubmit(VALID_USERNAME, VALID_PASSWORD);
    });

    test.describe('Positive scenario', () => {
        test('[#1] Should be able to redirect in Settings page and see the logout button', async () => {
            await homePage.goToSettingsPage();
            await settingsPage.assertLogoutButtonVisible();
            await settingsPage.signOut();
            await settingsPage.assertLogoutSuccessful();
        });
    });
});