import {Page, Locator, expect} from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly logoutButton: Locator;
    readonly userDisplay: Locator;

    constructor(page: Page) {
        this.page = page;
        this.logoutButton = page.getByRole('button', { name: /logout/i }); // Locate the signout button by its type and text content
        this.userDisplay = page.locator('img.user-pic'); // Locate the user display element by its CSS class 'user-pic'
    }

// Add functions for actions on objects
    async assertLogoutButtonVisible(): Promise<void> {
        await expect(this.logoutButton).toBeVisible(); 
    }

    async signOut(): Promise<void> {
        await this.logoutButton.click(); 
    }

    async assertLogoutSuccessful(): Promise<void> {
        await expect(this.page).toHaveURL(/\/$/); // Verify that the URL has changed to the application root page after successful logout
        await expect(this.userDisplay).toBeHidden(); // Verify that the user display is hidden, confirming a successful logout
    }
};