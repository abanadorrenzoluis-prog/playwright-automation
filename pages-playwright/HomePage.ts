import {Page, Locator, expect} from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly homeLink: Locator;
    readonly newArticleLink: Locator; 
    readonly settingsLink: Locator;
    readonly profileLink: Locator; 
    readonly articlePreviewLink: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.homeLink = page.getByRole('link', { name: /Home/i }); // Locate the home link by its role and name
        this.newArticleLink = page.getByRole('link', { name: /New Article/i }); // Locate the new article link by its role and name
        this.settingsLink = page.getByRole('link', { name: /Settings/i }); // Locate the settings link by its type and text content
        this.profileLink = page.getByRole('link', { name: /Profile/i }); // Locate the profile link by its role and name
        this.articlePreviewLink = page.locator('a.preview-link').first(); // Locate the first article preview 
    }

// Add functions for actions on objects
    async goToHomePage(timeout: number = 10000) {
        await this.homeLink.click({timeout}); 
        await expect(this.page).toHaveURL(/\/$/, {timeout}); // Verify that the URL has changed to the home page after clicking the home link 
    }

    async goToEditorPage(timeout: number = 10000) {
        await this.newArticleLink.click({timeout}); 
        await expect(this.page).toHaveURL(/\/editor$/, {timeout}); // Verify that the URL has changed to the editor page after clicking the new article link 
    }

    async goToSettingsPage(timeout: number = 10000) {
        await this.settingsLink.click({timeout}); 
        await expect(this.page).toHaveURL(/\/settings$/, {timeout}); // Verify that the URL has changed to the settings page after clicking the settings button 
    }

    async goToArticle(timeout: number = 10000) {
        await this.articlePreviewLink.click({timeout});
        await expect(this.page).toHaveURL(/\/article\/.+/, {timeout}); // Verify that the URL has changed to an article page after clicking the article preview link
    }
}