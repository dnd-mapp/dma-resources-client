import { expect, test } from '@playwright/test';

test('renders text content', async ({ page }) => {
    await page.goto('');

    expect(await page.textContent('h1')).toEqual('D&D Mapp: Resources client works!');
});
