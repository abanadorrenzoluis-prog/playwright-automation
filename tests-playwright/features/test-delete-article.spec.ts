import {test} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {HomePage} from '../../pages-playwright/HomePage';
import {EditorPage} from '../../pages-playwright/EditorPage';
import {SettingsPage} from '../../pages-playwright/SettingsPage';
import {getEnvVar} from '../utils/env';
import {generateArticleForDeletion} from '../utils/article-data';

// Load valid credentials from .env
const VALID_USERNAME = getEnvVar('VALID_USERNAME');
const VALID_PASSWORD = getEnvVar('VALID_PASSWORD');

test.describe('Delete Article Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let editorPage: EditorPage;
    let settingsPage: SettingsPage;
    // Setup before each test
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        editorPage = new EditorPage(page);
        settingsPage = new SettingsPage(page);
        await loginPage.goToLoginPage(10000);
        await loginPage.loginAndSubmit(VALID_USERNAME, VALID_PASSWORD);
        await loginPage.assertLoginSuccess(); 
    });
    
    test.describe('Positive scenarios', () => {
        test('[#1] Should be able to delete an article', async () => {
            const article = generateArticleForDeletion();
            await homePage.goToEditorPage();
            await editorPage.assertPublishNewArticleForm();
            await editorPage.fillArticle(article);
            await editorPage.publishArticle();
            await homePage.goToHomePage();
            await homePage.goToArticle();
            await editorPage.assertDeleteArticleButton();
            await editorPage.deleteArticle();
            await editorPage.assertDeleteArticleSuccess();
        });

        test('[#2] Should be able to delete an article from My Posts', async () => {
            const article = generateArticleForDeletion();
            await homePage.goToEditorPage();
            await editorPage.assertPublishNewArticleForm();
            await editorPage.fillArticle(article);
            await editorPage.publishArticle();
            await homePage.goToHomePage();
            await homePage.goToProfilePage();
            await homePage.goToArticle();
            await editorPage.assertDeleteArticleButton();
            await editorPage.deleteArticle();
            await editorPage.assertDeleteArticleSuccess();
        });
    });

    test.describe('Negative scenario', () => {
        test('[#3] Should not be able to delete an article when logout and was published by other users', async () => {
            await homePage.goToSettingsPage();
            await settingsPage.assertLogoutButtonVisible();
            await settingsPage.signOut();
            await homePage.goToArticle();
            await editorPage.assertDeleteArticleButtonNotVisible();
        });
    });
});