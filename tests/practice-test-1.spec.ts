import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await expect(page).toHaveURL(/.*intro/);
});

test('check Java page', async ({ page }) => {
  await page.goto('https://playwright.dev/java/');
  await page.getByRole('link', { name: 'Get started' }).click();
  await page.getByRole('button', { name: 'Java' }).hover();
  await page.getByText('Node.js', { exact: true }).click();
  await expect(page).toHaveURL('https://playwright.dev/docs/intro');
  await expect(page.getByText('Installing Playwright', { exact: true })).not.toBeVisible();
  const javaDescription = `Playwright Test is an end-to-end test framework for modern web apps. It bundles test runner, assertions, isolation, parallelization and rich tooling. Playwright supports Chromium, WebKit and Firefox on Windows, Linux and macOS, locally or in CI, headless or headed, with native mobile emulation for Chrome (Android) and Mobile Safari.`;
  await expect(page.getByText(javaDescription)).toBeVisible();
});
