import {Page, Locator, expect} from '@playwright/test';

export class ArticlePage {
    readonly page: Page;
    readonly writeCommentField: Locator;
    readonly postCommentButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page; 
        this.writeCommentField = page.locator('textarea[placeholder="Write a comment..."]');  // Locate the comment input field by its placeholder text
        this.postCommentButton = page.getByRole('button', { name: /Post Comment/i }); // Locate the post comment button by its role and name
        this.errorMessage = page.locator('app-list-errors li'); // Locate the error message by its CSS class
    }

//Add functions for actions on objects
    async assertArticlePage(): Promise<void> {
        await expect(this.page.getByRole('heading', { level: 1 })).toBeVisible();
        await expect(this.writeCommentField).toBeVisible();
        await expect(this.postCommentButton).toBeVisible();
    }

    async postComment(comment: string): Promise<void> {
        await this.writeCommentField.fill(comment);
        await this.postCommentButton.click();
    }

    async assertCommentPosted(comment: string): Promise<void> {
        await expect(this.page.getByText(comment).first()).toBeVisible();
    }

    async postCommentWithoutContent(): Promise<void> {
        await this.writeCommentField.fill('');
        await this.postCommentButton.click();
    }

    async assertCommentNotPosted(): Promise<void> {
        await expect(this.errorMessage).toBeVisible(); 
        await expect(this.errorMessage).toHaveText(/body/i); // Verify that the error message contains the word "body"
    }

    async assertArticleCommentSectionNotVisible(): Promise<void> {
        await expect(this.writeCommentField).toBeHidden();
        await expect(this.postCommentButton).toBeHidden();
        await expect(this.page.locator('a[href="/login"]')).toBeVisible();
        await expect(this.page.locator('a[href="/register"]')).toBeVisible();
    }
}

