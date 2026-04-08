import {Page, Locator, expect} from '@playwright/test';

export class SettingsPage {
    readonly page: Page;
    readonly settingslink: Locator;
    readonly signoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.settingslink = page.getByRole('link', { name: /Settings/i }); // Locate the settings link by its type and text content
        this.signoutButton = page.getByRole('button', { name: /logout/i }); // Locate the signout button by its type and text content
    }

// Add functions for actions on objects
    async goToSettingsPage(timeout: number = 10000) {
        await this.settingslink.click(); 
        await expect(this.page).toHaveURL(/\/settings$/); // Verify that the URL has changed to the settings page after clicking the settings button 
    }

    async assertSignoutButtonVisible(): Promise<void> {
        await expect(this.signoutButton).toBeVisible(); 
    }

    async signOut(): Promise<void> {
        await this.assertSignoutButtonVisible(); 
        await this.signoutButton.click(); 
    }

    async assertLogoutSuccessful(): Promise<void> {
        await expect(this.page).toHaveURL(/\/$/); // Verify that the URL has changed to the application root page after successful login
    }
};