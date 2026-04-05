import {test} from '@playwright/test' // Import Playwright test runner and assertion library
import {LoginPage} from '../../pages-playwright/LoginPage' // Import your Page Object for login

test.describe('login tests', () => {
    let loginPage: LoginPage; // Declare a variable to hold the LoginPage object
    
    // This hook runs before each test case
    test.beforeEach(async ({ page }) => { 
        loginPage = new LoginPage(page); // Create a new instance of LoginPage and pass the Playwright page object
        await loginPage.gotoLoginPage(); // Navigate to the login page before each test starts
    });

    // Successful login using valid credentials
    test('Should login successfully with valid credentials', async () => {
        await loginPage.login(process.env.VALID_USERNAME || '', process.env.VALID_PASSWORD || ''); // Perform login using valid credentials
        await loginPage.submit(); // Submit the login form by clicking the Sign in button
        await loginPage.verifyLoginSuccess(); // Verify that login was successful
    });

    // Unsuccessful login using invalid username and invalid password
    test('Should not login successfully with invalid username and invalid password', async () => {
        await loginPage.login(process.env.INVALID_USERNAME || '', process.env.INVALID_PASSWORD || ''); // Perform login using invalid username and invalid password
        await loginPage.submit(); // Submit the login form by clicking the Sign in button
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login using invalid username and valid password
    test('Should not login successfully with invalid username and valid password', async () => {
        await loginPage.login(process.env.INVALID_USERNAME || '', process.env.VALID_PASSWORD || ''); // Perform login using invalid username and valid password
        await loginPage.submit(); // Submit the login form by clicking the Sign in button
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login using valid username and invalid password
    test('Should not login successfully with valid username and invalid password', async () => {
        await loginPage.login(process.env.VALID_USERNAME || '', process.env.INVALID_PASSWORD || ''); // Perform login using valid username and invalid password
        await loginPage.submit(); // Submit the login form by clicking the Sign in button
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unable to click sign in button with empty username
    test('Sign in button disabled with empty username', async () => {
        await loginPage.password.fill(process.env.VALID_PASSWORD || ''); // Fill the password field
        await loginPage.expectSigninButtonDisabled(); // Asserts that the Sign In button is still be disabled
    });

    // Unable to click sign in button with empty password
    test('Sign in button is disabled when username is filled and password is empty', async () => {
        await loginPage.username.fill(process.env.VALID_USERNAME || ''); // Fill the username field
        await loginPage.expectSigninButtonDisabled(); // Asserts that the Sign In button is still be disabled
    });
    
    // Unable to click sign in button with empty fields
    test('Sign in button is disabled when all fields are empty', async () => {
        await loginPage.username.fill(''); // Keep the username field empty
        await loginPage.password.fill(''); // Keep the password field empty
        await loginPage.expectSigninButtonDisabled(); // Asserts that the Sign In button is still be disabled
    });
});