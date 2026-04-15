import {Page, Locator, expect} from '@playwright/test';
import {Article} from './types';

export class EditorPage {
    readonly page: Page;
    readonly articleTitle: Locator;
    readonly articleDescription: Locator;
    readonly articleBody: Locator;
    readonly articleTags: Locator;
    readonly publishArticleButton: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.articleTitle = page.locator('input[placeholder="Article Title"]'); // Locate the article title input field by its placeholder
        this.articleDescription = page.locator('input[placeholder="What\'s this article about?"]'); // Locate the article description input field by its placeholder
        this.articleBody = page.locator('textarea[placeholder="Write your article (in markdown)"]'); // Locate the article body textarea by its placeholder
        this.articleTags = page.locator('input[placeholder="Enter tags"]'); // Locate the article tags input field by its placeholder
        this.publishArticleButton = page.getByRole('button', { name: /Publish Article/i }); // Locate the publish article button by its role and name
    }

    get errorMessages() {
        return this.page.locator('app-list-errors .error-messages li');
    }

// Add functions for actions on objects
    async assertPublishNewArticleForm(): Promise<void> {
        await expect(this.articleTitle).toBeVisible(); 
        await expect(this.articleDescription).toBeVisible();
        await expect(this.articleBody).toBeVisible();
        await expect(this.articleTags).toBeVisible();
        await expect(this.publishArticleButton).toBeVisible();
    }

    async fillArticle(
        article: Article,
        options: { title?: boolean; description?: boolean; body?: boolean } = {}
    ): Promise<void> {
        const { title = true, description = true, body = true } = options;
        if (title) await this.articleTitle.fill(article.title);
        if (description) await this.articleDescription.fill(article.description);
        if (body) await this.articleBody.fill(article.body);

        for (const tag of article.tags) {
        await this.articleTags.fill(tag);
        await this.page.keyboard.press('Enter');
        }  
    }

    async publishArticle() {
        await this.publishArticleButton.click();
    }

    async validateErrorMsg(expectedErrors: string[]) {
        await expect(this.errorMessages.first()).toBeVisible(); // optional but recommended
        const errors = await this.errorMessages.allTextContents();

        expect(errors).toEqual(
            expect.arrayContaining(
                expectedErrors.map(err =>
                expect.stringMatching(new RegExp(err, 'i'))
                )
            )
        );
    }

    async getArticleSlug(): Promise<string> {
        // URL becomes /article/<slug>
        await this.page.waitForURL(/.*article\/.*/);
        const url = this.page.url();
        return url.split('/article/')[1];
    }

    async assertPublishSuccess(slug: string): Promise<void> {
        const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const articleUrlPattern = new RegExp(`/article/${escapedSlug}(\\?.*)?$`);
        await expect(this.page).toHaveURL(articleUrlPattern);
        await expect(this.page.getByRole('heading', { level: 1 })).toBeVisible();
    }
};