import { test, expect } from '../../src/fixtures/base-test.js';
import { environment } from '../../src/config/environment.js';
import { solveSimpleCaptcha } from '../../src/utils/phptravels.js';

const firstName = process.env.PHPTRAVELS_FIRST_NAME ?? 'Juan';
const lastName = process.env.PHPTRAVELS_LAST_NAME ?? 'Salazar';
const businessName = process.env.PHPTRAVELS_BUSINESS_NAME ?? 'QA Labs';
const country = process.env.PHPTRAVELS_COUNTRY ?? 'Peru';
const whatsapp = process.env.PHPTRAVELS_WHATSAPP ?? '999888777';
const email = process.env.PHPTRAVELS_EMAIL ?? `qa.${Date.now()}@example.com`;

test('PHPTravels demo request should grant access', async ({ page }) => {
  await page.goto(environment.phptravelsDemoUrl);

  await expect(page.getByRole('heading', { name: /Demo Travel Software/i })).toBeVisible();
  await page.getByPlaceholder(/Enter first name/i).fill(firstName);
  await page.getByPlaceholder(/Enter last name/i).fill(lastName);
  await page.getByPlaceholder(/Enter business name/i).fill(businessName);

  const countrySelect = page.locator('select').first();
  await countrySelect.selectOption({ label: 'Peru +51' });

  await page.getByPlaceholder(/Enter WhatsApp number/i).fill(whatsapp);
  await page.getByPlaceholder(/Enter email address/i).fill(email);
  await solveSimpleCaptcha(page);

  await page.getByRole('button', { name: /Submit/i }).click();

  // Esperar a que aparezca el mensaje de éxito (puede estar oculto inicialmente)
  await page.waitForTimeout(2000);
  await expect(page.getByText('Demo Access Granted!')).toBeAttached({ timeout: 30_000 });

  // La prueba es exitosa si llega hasta aquí - el formulario se envió correctamente
  console.log('✅ Demo request submitted successfully!');
});
