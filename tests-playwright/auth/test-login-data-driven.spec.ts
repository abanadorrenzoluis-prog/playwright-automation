import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {users} from '../test-data/login-users';

test.describe('Data-Driven Login Tests', () => {
  let loginPage: LoginPage;

  // Setup before each test
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goToLoginPage(10000); // Pass timeout in case page loads slowly
  });

  // Iterate through test data
  users.forEach((user, index) => {
    const usernameLabel = user.username || 'Empty';
    const passwordLabel = user.password || 'Empty';
    const testType = user.valid ? 'Valid Login' : 'Invalid Login';

    test(`[#${index + 1}] ${testType} | Username: ${usernameLabel} | Password: ${passwordLabel}`, async () => {

      // Step 1: Fill login form
      await loginPage.login(user.username.trim(), user.password.trim());

      // If fields are empty, the sign in button should be disabled
      const hasEmptyField = !user.username || !user.password;
      if (hasEmptyField) {
        await loginPage.assertSigninButtonDisabled();
        return;
      }

      // Step 2: Submit login
      await loginPage.assertSigninButtonEnabled();
      await loginPage.submit();

      // Step 3: Validate result
      if (user.valid) {
        await loginPage.assertLoginSuccess();
      } else {
        await loginPage.assertLoginUnsuccessful();
      }
    });
  });
});