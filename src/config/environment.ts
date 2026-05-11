import 'dotenv/config';

export type SupportedEnvironment = 'qa' | 'cert';

const testEnvironment = (process.env.TEST_ENV ?? 'qa').toLowerCase() as SupportedEnvironment;
if (!['qa', 'cert'].includes(testEnvironment)) {
  throw new Error(`Unsupported TEST_ENV: ${process.env.TEST_ENV}. Use qa or cert.`);
}

const secrets: Record<SupportedEnvironment, string | undefined> = {
  qa: process.env.SECRET_QA,
  cert: process.env.SECRET_CERT,
};

export const environment = {
  name: testEnvironment,
  secret: secrets[testEnvironment],
  dataFilePath: 'data/Datos-pruebas.xlsx',
  phptravelsDemoUrl: 'https://phptravels.com/demo',
} as const;
