import {test} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage' // Import the LoginPage class (Page Object Model)
import {users} from '../test-data/login-users'; // Import array of test users for data-driven testing

test.describe('data-driven login tests', () => {
    let loginPage: LoginPage; // Declare variable for LoginPage instance

    // Hook that runs before each test case
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page); // Create new LoginPage object for each test
        await loginPage.gotoLoginPage(); // Navigate to login page before each test
    });

    // Loop through each user from the imported users array
    for (const user of users) {
        // Dynamic test title: shows username or 'empty username' for clarity
        test(`Login test for "${user.username || 'empty username'}"`, async () => {
            await loginPage.login(user.username, user.password); // Attempt login with current user's credentials
            
            if (user.valid) {
                // Valid credentials: successful login
                await loginPage.verifyLoginSuccess();
            } else {
                // Invalid credentials: failed login
                await loginPage.verifyLoginUnsuccessful();
            }
        });
    }
});