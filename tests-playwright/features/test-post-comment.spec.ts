import {test} from '@playwright/test';
import {LoginPage} from '../../pages-playwright/LoginPage';
import {HomePage} from '../../pages-playwright/HomePage';
import {ArticlePage} from '../../pages-playwright/ArticlePage';
import {SettingsPage} from '../../pages-playwright/SettingsPage';
import {getEnvVar} from '../utils/env';
import {generateLongComment, generateShortComment} from '../utils/comment-data';

// Load valid credentials from .env
const VALID_USERNAME = getEnvVar('VALID_USERNAME');
const VALID_PASSWORD = getEnvVar('VALID_PASSWORD');

test.describe('Publish New Article Tests', () => {
    let loginPage: LoginPage;
    let homePage: HomePage;
    let articlePage: ArticlePage;
    let settingsPage: SettingsPage;
    
    // Setup before each test
    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        homePage = new HomePage(page);
        articlePage = new ArticlePage(page);
        settingsPage = new SettingsPage(page);

        await loginPage.goToLoginPage(10000);
        await loginPage.loginAndSubmit(VALID_USERNAME, VALID_PASSWORD);
        await loginPage.assertLoginSuccess(); 
    });
    
    test.describe('Positive scenario', () => {
        test('[#1] Should be able to post a comment from an article in Global Feed', async () => {
            const shortComment = generateShortComment();
            await homePage.goToArticle(10000);
            await articlePage.assertArticlePage();
            await articlePage.postComment(shortComment.body);
            await articlePage.assertCommentPosted(shortComment.body);
        });
        test('[#2] Should be able to post a long comment from an article in Global Feed', async () => {
            const longComment = generateLongComment();
            await homePage.goToArticle(10000);
            await articlePage.assertArticlePage();
            await articlePage.postComment(longComment.body);
            await articlePage.assertCommentPosted(longComment.body);
        });        
    });

    test.describe('Negative scenarios', () => {
        test('[#3] Should not be able to post a comment without content from an article in Global Feed', async () => {
            await homePage.goToArticle(10000);
            await articlePage.assertArticlePage();
            await articlePage.postCommentWithoutContent();
            await articlePage.assertCommentNotPosted();
        }); 
        test('[#4] Should not be able to post a comment when logged out from an article in Global Feed', async () => {
            await homePage.goToSettingsPage(10000);
            await settingsPage.signOut();
            await homePage.goToArticle(10000);
            await articlePage.assertArticleCommentSectionNotVisible();
        }); 
    });
});