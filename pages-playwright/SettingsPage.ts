import {Page, Locator, expect} from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly settingsLink: Locator;
    readonly logoutButton: Locator;
    readonly userDisplay: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingsLink = page.getByRole('link', { name: /Settings/i }); // Locate the settings link by its type and text content
        this.logoutButton = page.getByRole('button', { name: /logout/i }); // Locate the signout button by its type and text content
        this.userDisplay = page.locator('img.user-pic'); // Locate the user display element by its CSS class 'user-pic'
    }

// Add functions for actions on objects
    async goToSettingsPage(timeout: number = 10000) {
        await this.settingsLink.click({timeout}); 
        await expect(this.page).toHaveURL(/\/settings$/, {timeout}); // Verify that the URL has changed to the settings page after clicking the settings button 
    }

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