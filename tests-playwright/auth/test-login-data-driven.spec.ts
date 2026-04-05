import { test, expect } from '@playwright/test'; // Import Playwright test runner and assertion library
import { LoginPage } from '../../pages-playwright/LoginPage'; // Import your Page Object for login
import { users } from '../test-data/login-users'; // Import test data (username/password scenarios)

test.describe('Data-Driven Login Tests', () => {
    let loginPage: LoginPage; // Declare variable for LoginPage object

    // Runs before each test in this describe block
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); // Initialize Page Object with current page
        await loginPage.gotoLoginPage(); // Navigate to login page before each test
    });

    // Loop through all user test data to create multiple tests
    for (const [index, user] of users.entries()) {
        const usernameTitle = user.username || 'empty username'; // For display in test title if username is missing
        const validity = user.valid ? 'Valid Login' : 'Invalid Login'; // For display in test title

        // Define the test dynamically based on data
        test(`Login test #${index + 1} for "${usernameTitle}" (${validity})`, async () => {
            await loginPage.login(user.username, user.password); // Fill in username and password fields

            // CASE: empty username or password
            if (!user.username || !user.password) {
                await expect(loginPage.signinButton).toBeDisabled(); // Sign-in button should stay disabled
                return; // Exit test early since login cannot proceed
            }

            await loginPage.submit(); // Click the Sign-in button

            // CASE: Valid credentials
            if (user.valid) {
                await loginPage.verifyLoginSuccess(); // Assert successful login (user display visible, URL correct)
            } 
            // CASE: Invalid credentials
            else {
                await loginPage.verifyLoginUnsuccessful(); // Assert error message / login failed
            }
        });
    }
});



/*
import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {users} from '../test-data/login-users';

test.describe('Data-Driven Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.gotoLoginPage();
    });

    for (const [index, user] of users.entries()) {
        const usernameTitle = user.username || 'empty username';
        const validity = user.valid ? 'Valid Login' : 'Invalid Login';

        test(`Login test #${index + 1} for "${usernameTitle}" (${validity})`, async () => {
            await loginPage.login(user.username, user.password);
            if (!user.username || !user.password) {
                await expect(loginPage.signinButton).toBeDisabled();
                return;
            }
            await loginPage.submit();
            if (user.valid) {
                await loginPage.verifyLoginSuccess();
            } else {
                await loginPage.verifyLoginUnsuccessful();
            }
        });
    }
});*/