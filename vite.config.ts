/// <reference types="vitest/config" />
import { playwright } from '@vitest/browser-playwright';
import { defineConfig } from 'vite';

const isCI = Boolean(process.env['CI']);

export default defineConfig({
    test: {
        allowOnly: !isCI,
        browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: 'chromium' }],
            provider: playwright(),
        },
        clearMocks: true,
        coverage: {
            clean: true,
            cleanOnRerun: true,
            enabled: true,
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', 'main.ts'],
            provider: 'v8',
            reporter: ['text-summary', ['html', { subdir: '.' }]],
            reportOnFailure: true,
            reportsDirectory: 'reports/coverage',
            thresholds: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80,
            },
        },
        name: 'dma-resource-client',
        open: false,
        passWithNoTests: true,
        reporters: ['dot', ['html', { outputFile: 'reports/index.html' }]],
        sequence: {
            shuffle: true,
        },
        setupFiles: 'test/setup-test.ts',
        testNamePattern: 'src/**/*.spec.ts',
        ui: !isCI,
        uiBase: '/dma-resources-client/',
    },
});
