import { defineConfig, devices } from '@playwright/test';
import { getUserData } from "main/utils/credential.decoder";
import 'dotenv/config';

const formData = getUserData();

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 3,
  reporter: [
    ["line"], 
    [
      'allure-playwright',
      {
        outputFolder: './allure-results', 
        detail: true, // Ensures steps and attachments are captured
      },
    ],
    ['list'],
    ['playwright-qase-reporter',
      {
        mode: 'off',
        debug: true,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN,
          },
          project: process.env.QASE_TESTOPS_PROJECT || '5J',
          uploadAttachments: true,
          run: {
            id: process.env.QASE_TESTOPS_RUN_ID ? Number(process.env.QASE_TESTOPS_RUN_ID) : undefined,
            complete: false,
          },
        },
        framework: {
          markAsFlaky: true,
        },
      },
    ],
    
    ['html'],
    ['junit', { outputFile: 'test-results/junit-report.xml' }],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'http://cebhospapps01',
    httpCredentials: {
      username: formData.username,
      password: formData.password,
    },
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    ignoreHTTPSErrors: true,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    // { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    // { name: 'GChrome', use: { ...devices['Desktop Chrome'], channel: 'chrome' } },
    {
      name: 'smoke',
      grep: /@smoke/,
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});