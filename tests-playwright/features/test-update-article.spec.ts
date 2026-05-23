import {test, expect} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {HomePage} from '../../pages-playwright/HomePage';
import {EditorPage} from '../../pages-playwright/EditorPage';
import {getEnvVar} from '../utils/env';
import {generateArticle, generateUpdateArticle, generateUpdateArticleParts} from '../utils/article-data';

// Load valid credentials from .env
const VALID_USERNAME = getEnvVar('VALID_USERNAME');
const VALID_PASSWORD = getEnvVar('VALID_PASSWORD');

test.describe('Update Article Tests', () => {
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
        await loginPage.assertLoginSuccess(); 
    });
    
    test.describe('Positive scenario', () => {
        test('[#1] Should be able to update the whole article', async () => {
            const article = generateArticle();
            await homePage.goToEditorPage();
            await editorPage.assertPublishNewArticleForm();
            await editorPage.fillArticle(article);
            await editorPage.publishArticle();
            await homePage.goToHomePage();
            const updatearticle = generateUpdateArticle();
            await homePage.goToArticle();
            await editorPage.updateArticle();
            await editorPage.verifyArticleFieldsEnabled();
            await editorPage.clearArticleFields();
            await editorPage.articleTitle.fill(updatearticle.title);
            await editorPage.articleDescription.fill(updatearticle.description);
            await editorPage.articleBody.fill(updatearticle.body);
            await editorPage.publishArticle();
            const slug = await editorPage.getArticleSlug();
            await editorPage.assertPublishSuccess(slug);
        });

        test('[#2] Should be able to update the article title only', async () => {
            const updatearticle = generateUpdateArticleParts();
            await homePage.goToArticle();
            await editorPage.updateArticle();
            await editorPage.verifyArticleFieldsEnabled();
            await editorPage.articleTitle.clear();
            await editorPage.fillArticle(updatearticle, {description: false, body: false});
            await editorPage.publishArticle();
            const slug = await editorPage.getArticleSlug();
            await editorPage.assertPublishSuccess(slug);
        });

        test('[#3] Should be able to update the article description only', async () => {
            const updatearticle = generateUpdateArticleParts();
            await homePage.goToArticle();
            await editorPage.updateArticle();
            await editorPage.verifyArticleFieldsEnabled();
            await editorPage.articleDescription.clear();
            await editorPage.fillArticle(updatearticle, {title: false, body: false});
            await editorPage.publishArticle();
            const slug = await editorPage.getArticleSlug();
            await editorPage.assertPublishSuccess(slug);
        });

        test('[#4] Should be able to update the article body only', async () => {
            const updatearticle = generateUpdateArticleParts();
            await homePage.goToArticle();
            await editorPage.updateArticle();
            await editorPage.verifyArticleFieldsEnabled();
            await editorPage.articleBody.clear();
            await editorPage.fillArticle(updatearticle, {title: false, description: false});
            await editorPage.publishArticle();
            const slug = await editorPage.getArticleSlug();
            await editorPage.assertPublishSuccess(slug);
        });
    });
});