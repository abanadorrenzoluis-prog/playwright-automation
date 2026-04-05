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
        const validity = user.valid ? 'valid' : 'invalid';

        test(`Login test #${index + 1} for "${usernameTitle}" (${validity})`, async () => {
            await loginPage.login(user.username, user.password);

            const isDisabled = await loginPage.isSigninButtonDisabled();

            // CASE 1: Empty or invalid input → button disabled
            if (isDisabled) {
                await expect(loginPage.signinButton).toBeDisabled();
                return;
            }

            // Click only if enabled
            await loginPage.submit();

            // CASE 2: Valid login
            if (user.valid) {
                //await loginPage.verifyLoginSuccess(user.username);
                await loginPage.verifyLoginSuccess();
            } 
            // CASE 3: Invalid login
            else {
                await loginPage.verifyLoginUnsuccessful();
            }
        });
    }
});