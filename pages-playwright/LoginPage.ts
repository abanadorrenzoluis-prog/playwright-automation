import {Page, Locator, expect} from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator; 
    readonly signinButton: Locator;
    readonly userDisplay: Locator; 
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.username = page.locator('input[formcontrolname="email"]'); // Locate the username input field by its form control name 'email'
        this.password = page.locator('input[formcontrolname="password"]'); // Locate the password input field by its form control name 'password'
        // this.signinButton = page.locator('button[type="submit"].btn-primary:has-text("Sign in")'); 
        this.signinButton = page.getByRole('button', {name: 'Sign in'}); // Locate the signin button by its type and text content
        this.userDisplay = page.locator('img.user-pic'); // Locate the user display element by its CSS class 'user-pic'
        this.errorMessage = page.locator('app-list-errors li'); // Locate the error message by its CSS class
    }

// Add functions for actions on objects
    async goToLoginPage(timeout: number = 10000) {
        await this.page.goto('/login', {waitUntil: 'domcontentloaded', timeout}); // Navigate quickly the login page
        await expect(this.username).toBeVisible({timeout});  // Ensure important element is ready before interacting    
    }

    async login(username: string, password: string): Promise<void> {
        await this.username.fill(username.trim()); 
        await this.password.fill(password.trim()); 
    }

    async submit(): Promise<void> {
        await this.signinButton.click(); 
    }

    async assertSigninButtonEnabled(): Promise<void> {
        await expect(this.signinButton).toBeEnabled(); 
    }

    async assertSigninButtonDisabled(): Promise<void> {
        await expect(this.signinButton).toBeDisabled();
    }

    // Combines filling the form and submitting it in one step (used in test-login.spec.ts)
    async loginAndSubmit(username: string, password: string): Promise<void> {
        await this.login(username, password);
        await this.assertSigninButtonEnabled();
        await this.submit();
    }

    async assertLoginSuccess(): Promise<void> {
        await expect(this.page).toHaveURL(/\/$/); // Verify that the URL has changed to the dashboard page after successful login
        await expect(this.userDisplay).toBeVisible(); // Verify that the user display is visible, confirming a successful login
    }

    async assertLoginUnsuccessful(): Promise<void> {
        await expect(this.page).toHaveURL(/\/login$/); // Verify that the URL remains the same, indicating that the user is still on the login page after an unsuccessful login attempt
        await expect(this.errorMessage).toBeVisible(); 
        await expect(this.errorMessage).toHaveText(/invalid/i); // Verify that the error message contains the word "invalid" (case-insensitive)
    }
};