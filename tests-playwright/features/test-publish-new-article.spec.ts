import {test,expect} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {HomePage} from '../../pages-playwright/HomePage';
import {EditorPage} from '../../pages-playwright/EditorPage';
import {getEnvVar} from '../utils/env';
import {generateArticle} from '../utils/article-data';

// Load valid credentials from .env
const VALID_USERNAME = getEnvVar('VALID_USERNAME');
const VALID_PASSWORD = getEnvVar('VALID_PASSWORD');

test.describe('Publish New Article Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let editorPage: EditorPage;

    // Setup before each test
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        editorPage = new EditorPage(page);
        await loginPage.goToLoginPage(10000);
        await loginPage.loginAndSubmit(VALID_USERNAME, VALID_PASSWORD);
    });

    test.describe('Positive scenario', () => {
        test('[#1] Should be able to publish new article', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.assertPublishNewArticleForm();
            await editorPage.fillArticle(article);
        });
    });

    test.describe('Negative scenarios', () => {
        test('[#2] Should not be able to publish new article without title', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoTitle(article);
            await editorPage.validateErrors(['title']);
        });

        test('[#3] Should not be able to publish new article without description', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoDesc(article);
            await editorPage.validateErrors(['description']);
        });

        test('[#4] Should not be able to publish new article without body', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoBody(article);
            await editorPage.validateErrors(['body']);
        });

        test('[#5] Should not be able to publish new article without description and body', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoDescAndBody(article);
            await editorPage.validateErrors(['description','body']);
        });

        test('[#6] Should not be able to publish new article without title and body', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoTitleAndBody(article);
            await editorPage.validateErrors(['title','body']);
        });

        test('[#7] Should not be able to publish new article without title and description', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoTitleAndDesc(article);
            await editorPage.validateErrors(['title','description']);
        });

        test('[#8] Should not be able to publish new article without title, description, and body', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.fillArticleNoTitleDescAndBody(article);
            await editorPage.validateErrors(['title','description','body']);
        });
    });
});