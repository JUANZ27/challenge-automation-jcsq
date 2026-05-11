import { test, expect } from '../../src/fixtures/base-test.js';
import { fillStripeCardInAnyFrame, firstVisible } from '../../src/utils/phptravels.js';

const frontendUrl = process.env.PHPTRAVELS_FRONTEND_URL;
const username = process.env.PHPTRAVELS_USERNAME;
const password = process.env.PHPTRAVELS_PASSWORD;

test.skip(!frontendUrl || !username || !password, 'Set PHPTRAVELS_FRONTEND_URL, PHPTRAVELS_USERNAME and PHPTRAVELS_PASSWORD to enable the sandbox checkout test.');

test('PHPTravels sandbox checkout can reach payment step', async ({ page }) => {
  await page.goto(frontendUrl!);

  const loginLink = await firstVisible(page, ['a:has-text("Login")', 'button:has-text("Login")', 'a[href*="login"]']);
  await loginLink.click();

  const emailField = await firstVisible(page, ['input[type="email"]', 'input[name="email"]', 'input[name="username"]']);
  await emailField.fill(username!);
  const passwordField = await firstVisible(page, ['input[type="password"]']);
  await passwordField.fill(password!);
  const submit = await firstVisible(page, ['button:has-text("Login")', 'button[type="submit"]']);
  await submit.click();

  const hotelsNav = await firstVisible(page, ['a:has-text("Hotels")', 'button:has-text("Hotels")']);
  await hotelsNav.click();

  const searchButton = await firstVisible(page, ['button:has-text("Search")', 'button[type="submit"]']);
  await searchButton.click();

  const bookNow = await firstVisible(page, ['a:has-text("Book Now")', 'button:has-text("Book Now")', 'a:has-text("Details")']);
  await bookNow.click();

  const checkout = await firstVisible(page, ['button:has-text("Checkout")', 'a:has-text("Checkout")', 'button:has-text("Book")']);
  await checkout.click();

  await fillStripeCardInAnyFrame(
    page,
    process.env.STRIPE_CARD_NUMBER ?? '4242424242424242',
    process.env.STRIPE_CARD_EXP ?? '12/34',
    process.env.STRIPE_CARD_CVC ?? '123',
    process.env.STRIPE_CARD_HOLDER ?? 'QA Automation'
  );

  await expect(page.locator('text=/Card|Stripe|Payment/i').first()).toBeVisible();
});
