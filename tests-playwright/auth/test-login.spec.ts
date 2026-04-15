import {test} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {getEnvVar} from '../utils/env';


// Load valid credentials from .env
const VALID_USERNAME = getEnvVar('VALID_USERNAME');
const VALID_PASSWORD = getEnvVar('VALID_PASSWORD');

// Define invalid credentials locally
const INVALID_USERNAME = 'nonexisting_user';
const INVALID_PASSWORD = 'wrong_password';

test.describe('Login Tests', () => {
    let loginPage: LoginPage;
    // Setup before each test
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.goToLoginPage(10000);
    });

    test.describe('Positive scenario', () => {
        test('[#1] Should be able to login successfully with valid credentials', async () => {
            await loginPage.loginAndSubmit(VALID_USERNAME, VALID_PASSWORD);
            await loginPage.assertLoginSuccess(); 
        });
    });
    
    test.describe('Negative scenarios', () => {
        test('[#2] Should not be able to login with invalid credentials', async () => {
            await loginPage.loginAndSubmit(INVALID_USERNAME, INVALID_PASSWORD);
            await loginPage.assertLoginUnsuccessful();
        });

        test('[#3] Should not be able to login with invalid username', async () => {
            await loginPage.loginAndSubmit(INVALID_USERNAME, VALID_PASSWORD);
            await loginPage.assertLoginUnsuccessful();
        });

        test('[#4] Should not be able to login with invalid password', async () => {
            await loginPage.loginAndSubmit(VALID_USERNAME, INVALID_PASSWORD);
            await loginPage.assertLoginUnsuccessful();
        });
    });

    test.describe('Empty field validation scenarios', () => {
        test('[#5] Sign in button should be disabled when password is not filled', async () => {
            await loginPage.username.fill(VALID_USERNAME);
            await loginPage.assertSigninButtonDisabled();
        });

        test('[#6] Sign in button should be disabled when username is not filled', async () => {
            await loginPage.password.fill(VALID_PASSWORD);
            await loginPage.assertSigninButtonDisabled();
        });

        test('[#7] Sign in button should be disabled when all fields are not filled', async () => {
            await loginPage.login('', '');
            await loginPage.assertSigninButtonDisabled();
        });
    });
});