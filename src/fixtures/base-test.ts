import { test as base, expect } from '@playwright/test';
import { environment } from '../config/environment.js';
import { sha256 } from '../utils/crypto.js';
import { logInfo, logTestFinished } from '../utils/logger.js';

type CustomFixtures = { secretHash: string };

export const test = base.extend<CustomFixtures>({
  secretHash: [
    async ({}, use, testInfo) => {
      if (!environment.secret) {
        throw new Error(`Missing secret for environment ${environment.name}. Define ${environment.name === 'qa' ? 'SECRET_QA' : 'SECRET_CERT'}.`);
      }
      const hashedSecret = sha256(environment.secret);
      logInfo(`Environment: ${environment.name}`);
      logInfo(`Hashed secret: ${hashedSecret}`);
      testInfo.annotations.push({ type: 'environment', description: environment.name });
      await use(hashedSecret);
      logTestFinished(testInfo.title);
    },
    { auto: true },
  ],
});

export { expect };
