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
            // TODO #1: Enable once Angular supports it
            // enabled: true,
            include: ['src/**/*.ts'],
            exclude: ['**/index.ts', 'main.ts'],
            provider: 'v8',
            reporter: ['text-summary', ['html', { subdir: 'coverage' }]],
            reportOnFailure: true,
            // TODO #1: Change back to `reports` once Angular properly supports vitest
            // reportsDirectory: 'reports',
            reportsDirectory: 'coverage/dma-resources-client',
            // TODO #1: Enable once thresholds are working correctly
            // thresholds: {
            //     branches: 80,
            //     functions: 80,
            //     lines: 80,
            //     statements: 80,
            // },
        },
        name: 'dma-resource-client',
        open: false,
        passWithNoTests: true,
        // TODO #1: Change back to `reports/index.html` once Angular properly supports vitest
        // reporters: ['dot', ['html', { outputFile: 'reports/index.html' }]],
        reporters: ['dot', ['html', { outputFile: 'coverage/dma-resources-client/index.html' }]],
        sequence: {
            shuffle: true,
        },
        setupFiles: 'test/setup-test.ts',
        testNamePattern: 'src/**/*.spec.ts',
        // TODO #1: Enable once Angular supports it
        // ui: !isCI,
        uiBase: '/dma-resources-client/',
    },
});
