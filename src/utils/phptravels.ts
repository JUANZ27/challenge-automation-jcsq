import { Locator, Page, expect } from '@playwright/test';

export async function solveSimpleCaptcha(page: Page): Promise<void> {
  // Buscar el texto de la operación matemática en la página
  const text = await page.locator('body').innerText();
  const match = text.match(/(\d+)\s*\+\s*(\d+)\s*=\s*\?/);
  if (!match) {
    return;
  }

  const result = String(Number(match[1]) + Number(match[2]));

  // Usar el input específico del captcha (id="number")
  const captchaInput = page.locator('#number');
  await captchaInput.fill(result);
}

export async function fillStripeCardInAnyFrame(page: Page, cardNumber: string, exp: string, cvc: string, holder: string): Promise<void> {
  const frames = page.frames();
  for (const frame of frames) {
    try {
      const card = frame.locator('input[name="cardnumber"], input[placeholder*="1234" i]');
      if (await card.count()) {
        await card.first().fill(cardNumber);
        await frame.locator('input[name="exp-date"], input[placeholder*="MM / YY" i]').first().fill(exp);
        await frame.locator('input[name="cvc"], input[placeholder*="CVC" i]').first().fill(cvc);
        const holderField = frame.locator('input[name="billingName"], input[placeholder*="Name" i]');
        if (await holderField.count()) {
          await holderField.first().fill(holder);
        }
        return;
      }
    } catch {
      // try next frame
    }
  }

  const plainCard = page.locator('input[name="cardnumber"], input[placeholder*="1234" i]');
  if (await plainCard.count()) {
    await plainCard.first().fill(cardNumber);
    await page.locator('input[name="exp-date"], input[placeholder*="MM / YY" i]').first().fill(exp);
    await page.locator('input[name="cvc"], input[placeholder*="CVC" i]').first().fill(cvc);
    const holderField = page.locator('input[name="billingName"], input[placeholder*="Name" i]');
    if (await holderField.count()) {
      await holderField.first().fill(holder);
    }
    return;
  }

  throw new Error('Stripe card fields were not found. Inspect the sandbox checkout DOM and adjust locators.');
}

export async function firstVisible(page: Page, selectors: string[]): Promise<Locator> {
  for (const selector of selectors) {
    const locator = page.locator(selector).first();
    if (await locator.count()) {
      return locator;
    }
  }
  throw new Error(`None of the selectors matched: ${selectors.join(' | ')}`);
}
