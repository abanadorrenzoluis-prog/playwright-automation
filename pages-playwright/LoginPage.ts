import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page; // Represents the browser page (tab) you are controlling
    readonly username: Locator; // Locator for the username input field
    readonly password: Locator; // Locator for the password input field
    readonly loginButton: Locator; // Locator for the login button
    readonly welcomeMessage: Locator; // Locator for the welcome message displayed after successful login
    readonly errorMessage: Locator; // Locator for the error message displayed after unsuccessful login

    constructor(page: Page) {
        this.page = page; // Store the Page object from Playwright so it can be used in other methods
        this.username = page.locator('#username'); // Make sure this id matches the actual input field; Locate the username input field by its HTML id 'username'
        this.password = page.locator('#password'); // Verify this id too; Locate the password input field by its HTML id 'password'
        this.loginButton = page.locator('#login-button'); // Ensure this id matches the button in the DOM; Locate the login button by its HTML id 'login-button'
        this.welcomeMessage = page.locator('#welcome-message'); // Ensure this id matches the element that appears after a successful login; Locate the welcome message by its HTML id 'welcome-message'
        this.errorMessage = page.locator('#error-message'); // Ensure this id matches the element that appears after an unsuccessful login; Locate the error message by its HTML id 'error-message'
    }

// add functions for actions on objects
    async gotoLoginPage() {
    await this.page.goto('https://example.com/login', { waitUntil: 'domcontentloaded' }); // replace with the actual URL of the login page; Navigate quickly (don't wait for everything)
    await this.username.waitFor({ state: 'visible' }); // Ensure important element is ready before interacting    
    }

    async login(username: string, password: string) {
    await this.username.fill(username); // Fill in the username input field
    await this.password.fill(password); // Fill in the password input field
    await this.loginButton.click(); // Click the login button
    }

    async verifyLoginSuccess() {
    await expect(this.welcomeMessage).toBeVisible(); // Verify that the welcome message is visible, confirming a successful login
    await expect(this.page).toHaveURL('https://example.com/dashboard'); // Verify that the URL has changed to the dashboard page after successful login
    }

    async verifyLoginUnsuccessful() {
    await expect(this.errorMessage).toBeVisible(); // Verify that the error message is visible, confirming an unsuccessful login    
    await expect(this.page).toHaveURL('https://example.com/login'); // Verify that the URL remains the same, indicating that the user is still on the login page after an unsuccessful login attempt
    }
};