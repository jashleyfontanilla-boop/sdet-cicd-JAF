import { Page, Locator, expect, TestInfo } from "@playwright/test";
import { sauceDemoLoginLocators } from "../locators/sauceDemoLoginLocators";
import { Logger } from "../utils/logger";
import { ScreenshotHelper } from '../utils/screenshot';

export class loginPage {
    readonly page: Page;
    private logger: Logger;
    private screenshot: ScreenshotHelper;

    readonly userName: Locator;
    readonly password: Locator;
    readonly loginButton: Locator;
    readonly loginError: Locator;
    readonly lockedOutAccount: Locator;


    constructor(page: Page, testinfo: TestInfo, screenshot: ScreenshotHelper) {
        this.page = page;
        this.logger = new Logger();
        this.screenshot = screenshot;

        this.userName = page.getByRole(
            sauceDemoLoginLocators.userName.role,
            sauceDemoLoginLocators.userName.text
        );

        this.password = page.getByRole(
            sauceDemoLoginLocators.password.role,
            sauceDemoLoginLocators.password.text
        );

        this.loginButton = page.getByRole(
            sauceDemoLoginLocators.loginButton.role,
            sauceDemoLoginLocators.loginButton.text
        );

        this.loginError = page.getByRole(
            sauceDemoLoginLocators.loginError.role,
            sauceDemoLoginLocators.loginError.text
        );

        this.lockedOutAccount = page.getByRole(
            sauceDemoLoginLocators.lockedOutAccount.role,
            sauceDemoLoginLocators.lockedOutAccount.text
        );
    }

    // Navigate to SauceDemo
    async navigateToSauceDemo(): Promise<void> {
        this.logger.info("Navigating to SauceDemo Login Page");

        await this.page.goto(process.env.BASE_URL!);

        await this.screenshot.captureStep(this.page, 'Form filled', { fullPage: true });
            this.logger.info("Navigated to SauceDemo Login Page");
    }

    // Enter Username
    async enterUsername(username: string): Promise<void> {
        this.logger.info(`Entering Username: ${username}`);

        await this.userName.fill(username);

    }

    // Enter Password
    async enterPassword(password: string): Promise<void> {
        this.logger.info("Entering Password");

        await this.password.fill(password);

    }

    // Click Login Button
    async clickLoginButton(): Promise<void> {
        this.logger.info("Clicking Login Button");

        await this.loginButton.click();
    }

    // Complete Login
    async login(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.screenshot.captureStep(this.page, 'Login Details', { fullPage: true });
        await this.clickLoginButton();
        await this.screenshot.captureStep(this.page, 'Login Status', { fullPage: true });
    }

    // Verify Successful Login
    async verifySuccessfulLogin(): Promise<void> {
        this.logger.info("Verifying Successful Login");

        await expect(this.page).toHaveURL(/inventory/);
        await expect(
            this.page.getByText("Products")).toBeVisible();
    }

    // Verify Login Error
    async verifyLoginError(): Promise<void> {
        this.logger.info("Verifying Login Error Message");
        await expect(this.loginError).toBeVisible({ timeout: 10000 });
        await this.screenshot.captureStep(this.page, 'Login Error', { fullPage: true });
    }

    // Verify Locked Out
    async verifyLockedOutAccount(): Promise<void> {
        this.logger.info("Verifying Locked Out Account Message");
        await expect(this.lockedOutAccount).toBeVisible({ timeout: 10000 });
        await this.screenshot.captureStep(this.page, 'Locked Out Account', { fullPage: true });
    }
}