import { defineConfig, devices } from '@playwright/test';

const isCI = Boolean(process.env['CI']);
const baseUrl = isCI ? 'https://resources-test.dndmapp.nl.eu.org/app' : 'https://localhost.www.dndmapp.dev:4600/app';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
    failOnFlakyTests: isCI,
    forbidOnly: isCI,
    fullyParallel: true,
    globalSetup: [],
    globalTeardown: [],
    name: 'resources-client',
    outputDir: '../coverage/e2e',
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    reporter: [['html', { outputFolder: '../coverage/e2e' }], ['dot']],
    retries: isCI ? 2 : 0,
    testMatch: 'src/**/*.spec.ts',
    use: {
        baseURL: baseUrl,
        colorScheme: 'dark',
        ignoreHTTPSErrors: true,
        trace: 'on-first-retry',
        ...(isCI
            ? null
            : {
                  clientCertificates: [
                      {
                          origin: 'https://localhost.resources.dndmapp.dev:4600',
                          certPath: '../cert.pem',
                          keyPath: '../key.pem',
                      },
                  ],
              }),
    },
    ...(isCI
        ? { workers: 1 }
        : {
              webServer: {
                  command: 'pnpm start',
                  ignoreHTTPSErrors: true,
                  reuseExistingServer: true,
                  url: baseUrl,
              },
          }),
});
