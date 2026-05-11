import 'dotenv/config';
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  fullyParallel: true,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    headless: true,
    viewport: { width: 1440, height: 900 }
  }
});
