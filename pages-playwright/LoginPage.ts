import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page; // Represents the browser page (tab) you are controlling
    readonly username: Locator; // Locator for the username input field
    readonly password: Locator; // Locator for the password input field
    readonly signinButton: Locator; // Locator for the login button
    readonly userDisplay: Locator; // Locator for the user display displayed after successful login
    readonly errorMessage: Locator; // Locator for the error message displayed after unsuccessful login

    constructor(page: Page) {
        this.page = page; // Store the Page object from Playwright so it can be used in other methods
        this.username = page.locator('input[formcontrolname="email"]'); // Locate the username input field by its form control name 'email'
        this.password = page.locator('input[formcontrolname="password"]'); // Locate the password input field by its form control name 'password'
        this.signinButton = page.locator('button[type="submit"].btn-primary:has-text("Sign in")'); // Locate the login button by its type
        this.userDisplay = page.locator('a.nav-link >> img.user-pic'); // Locate the user display element by its text content
        this.errorMessage = page.locator('app-list-errors li:has-text("credentials invalid")'); // Locate the error message by its CSS class
    }

// Add functions for actions on objects
    async gotoLoginPage() {
        await this.page.goto('https://demo.realworld.show/login', { waitUntil: 'domcontentloaded' }); // Navigate quickly the login page
        await this.username.waitFor({state: 'visible'}); // Ensure important element is ready before interacting    
    }

    async login(username: string, password: string) {
        await this.username.fill(username); // Fill in the username input field
        await this.password.fill(password); // Fill in the password input field
    }

    async submit() {
        await this.signinButton.click(); // Submit the login form by clicking the Sign in button
    }

    async signinButtonDisabled() {
        await expect(this.signinButton).toBeDisabled(); // Asserts that the Sign In button is still be disabled
    }

    async verifyLoginSuccess() {
        await expect(this.userDisplay).toBeVisible(); // Verify that the user display is visible, confirming a successful login
        await expect(this.page).toHaveURL('https://demo.realworld.show/'); // Verify that the URL has changed to the dashboard page after successful login
    }

    async verifyLoginUnsuccessful() {
        await this.errorMessage.waitFor({state: 'visible'}); // Wait for the error message to be visible, confirming an unsuccessful
        await expect(this.page).toHaveURL('https://demo.realworld.show/login'); // Verify that the URL remains the same, indicating that the user is still on the login page after an unsuccessful login attempt
    }

    async isSigninButtonDisabled() {
        return await this.signinButton.isDisabled(); // Boolean check - returns a true if button is disabled, false if enabled
    }
};