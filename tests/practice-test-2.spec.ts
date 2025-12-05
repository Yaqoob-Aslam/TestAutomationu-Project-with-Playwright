import { test, type Page } from '@playwright/test';
import { HomePage } from '../pages/home-page';

const URL = 'https://playwright.dev/';
let homePage: HomePage;


test.beforeEach(async ({page}) => {
    await page.goto(URL);
    homePage = new HomePage(page);
});

async function clickGetStarted(page: Page) {
    await homePage.clickGetStarted();
}

test.describe('Playwright website', () => {

    test('has title', async () => {
        await homePage.assertPageTitle();
    });
    
    test('get started link', async ({ page }) => {
        await clickGetStarted(page);
    });
    
    test('check Java page', async ({ page }) => {
        await test.step('Act', async () => {
            await clickGetStarted(page);
        });
    });
});