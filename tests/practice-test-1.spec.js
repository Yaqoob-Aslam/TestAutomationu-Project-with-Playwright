import { test, expect, chromium } from '@playwright/test';

test.describe.serial('Practice-Test-1', () => {

  let browser, context, page;
  const BASE_URL = 'https://playwright.dev/';

  test.beforeAll(async () => {
    browser = await chromium.launch({
      headless: false,
      args: ['--start-maximized'],
      slowMo: 200, // slows down actions for stability
    });
    context = await browser.newContext({
      viewport: null,
      deviceScaleFactor: undefined,
      ignoreHTTPSErrors: true,
      javaScriptEnabled: true
    });
    page = await context.newPage();

    // Set longer default timeout for all actions
    page.setDefaultTimeout(1800);
    page.setDefaultNavigationTimeout(12000);
  });

  test('Chcek the Java page', async ()=>{
      await page.goto(BASE_URL);
      await page.getByRole('link', {name: 'Get started'}).click();
      await page.getByRole('button', {name: 'Node.js'}).hover();
      await page.getByText('Java', {exact: true}).click();
      await expect(page).toHaveURL('https://playwright.dev/java/docs/intro');
      await expect(page.getByText('Installing Playwright', {exact:true})).not.toBeVisible();
      const javaDescription = `Playwright is distributed as a set of Maven modules. The easiest way to use it is to add one dependency to your project's pom.xml as described below. If you're not familiar with Maven please refer to its documentation.`;
      await expect(page.getByText(javaDescription)).toBeVisible();
  });

test.afterAll(async () => {
    await page.pause();
    // await page.close();
  });
});