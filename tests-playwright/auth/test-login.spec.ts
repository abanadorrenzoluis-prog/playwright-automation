import {test} from '@playwright/test'
import {LoginPage} from '../../pages-playwright/LoginPage'

test.describe('login tests', () => {
    let loginPage: LoginPage; // Declare a variable to hold the LoginPage object
    
    // This hook runs before each test case
    test.beforeEach(async ({ page }) => { 
        loginPage = new LoginPage(page); // Create a new instance of LoginPage and pass the Playwright page object
        await loginPage.gotoLoginPage(); // Navigate to the login page before each test starts
    });

    // Successful login using valid credentials
    test('should login successfully with valid credentials', async () => {
        await loginPage.login('validUsername', 'validPassword'); // Perform login using valid credentials
        await loginPage.verifyLoginSuccess(); // Verify that login was successful
    });

    // Unsuccessful login using invalid username and invalid password
    test('should not login successfully with invalid username and invalid password', async () => {
        await loginPage.login('invalidUsername', 'invalidPassword'); // Perform login using invalid username and invalid password
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login using invalid username and valid password
    test('should not login successfully with invalid username and valid password', async () => {
        await loginPage.login('invalidUsername', 'validPassword'); // Perform login using invalid username and valid password
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login using valid username and invalid password
    test('should not login successfully with valid username and invalid password', async () => {
        await loginPage.login('validUsername', 'invalidPassword'); // Perform login using valid username and invalid password
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login with empty fields
    test('should not login successfully with empty fields', async () => {
        await loginPage.login('', ''); // Perform login using empty test data
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login with empty username and filled password
    test('should not login successfully with empty username and filled password', async () => {
        await loginPage.login('', 'validPassword'); // Perform login using empty username and valid password
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });

    // Unsuccessful login with filled username and empty password
    test('should not login successfully with filled username and empty password', async () => {
        await loginPage.login('validUsername', ''); // Perform login using valid username and empty password
        await loginPage.verifyLoginUnsuccessful(); // Verify that login was unsuccessful
    });
});