import { Page, Locator, expect, TestInfo } from "@playwright/test";
import { sauceDemoInventoryLocators } from "../locators/sauceDemoInventoryLocators";
import { Logger } from "../utils/logger";
import { ScreenshotHelper } from "../utils/screenshot";

export class sauceDemoInventoryPage {
    readonly page: Page;
    private logger: Logger;
    private screenshot: ScreenshotHelper;

    readonly addToCartBackpackButton: Locator;
    readonly removeBackpackButton: Locator;
    readonly filterDropdown: Locator;
    readonly cartButton: Locator;

    constructor(page: Page, testinfo: TestInfo, screenshot: ScreenshotHelper) {
        this.page = page;
        this.logger = new Logger();
        this.screenshot = screenshot;

        this.addToCartBackpackButton = page.getByTestId(
            sauceDemoInventoryLocators.addToCartBackpackButton.testId

        );

        this.removeBackpackButton = page.getByRole(
            sauceDemoInventoryLocators.removeBackpackButton.role
        );

        this.filterDropdown = page.getByRole(
            sauceDemoInventoryLocators.filterDropdown.role
        );

        this.addToCartBackpackButton = page.getByTestId(
            sauceDemoInventoryLocators.addToCartBackpackButton.testId
        );

        this.cartButton = page.getByRole(
            sauceDemoInventoryLocators.cartButton.role
        );
    }

    // Verify Inventory Page
    async verifyInventoryPageIsDisplayed(): Promise<void> {
        this.logger.info("Verifying Inventory Page is displayed");

        await expect(this.page).toHaveURL(/inventory/);
        await expect(this.page.getByText("Products")).toBeVisible();

        await this.screenshot.captureStep(this.page, "Inventory Page Displayed", { fullPage: true });
    }

    // Add Sauce Labs Backpack to Cart
    async addBackpackToCart(): Promise<void> {
        this.logger.info("Adding Sauce Labs Backpack to cart");

        await this.addToCartBackpackButton.click();
        await expect(this.removeBackpackButton).toBeVisible({ timeout: 10000 });

        await this.screenshot.captureStep(this.page, "Backpack Added to Cart", { fullPage: true });
    }

    // Verify Cart Badge Count
    async verifyCartBadgeCount(expectedCount: string): Promise<void> {
        this.logger.info(`Verifying cart badge count is ${expectedCount}`);

        await expect(this.cartButton).toBeVisible({ timeout: 10000 });
        await expect(this.cartButton).toHaveText(expectedCount);

        await this.screenshot.captureStep(this.page, "Cart Badge Count Verified", { fullPage: true });
    }

    // Remove Sauce Labs Backpack from Cart
    async removeBackpackFromCart(): Promise<void> {
        this.logger.info("Removing Sauce Labs Backpack from cart");

        await this.removeBackpackButton.click();

        await this.screenshot.captureStep(this.page, "Backpack Removed from Cart", { fullPage: true });
    }

    // Verify Add to Cart Button is Displayed
    async verifyAddToCartButtonIsDisplayed(): Promise<void> {
        this.logger.info("Verifying Add to Cart button is displayed");

        await expect(this.addToCartBackpackButton).toBeVisible({ timeout: 10000 });
    }

    // Verify Remove Button is Displayed
    async verifyRemoveButtonIsDisplayed(): Promise<void> {
        this.logger.info("Verifying Remove button is displayed");

        await expect(this.removeBackpackButton).toBeVisible({ timeout: 10000 });
    }

    // Select Product Filter
    async selectProductFilter(option: string): Promise<void> {
        this.logger.info(`Selecting product filter: ${option}`);

        await this.filterDropdown.selectOption(option);

        await this.screenshot.captureStep(this.page, `Selected Product Filter - ${option}`, { fullPage: true });
    }

    // Open Cart
    async openCart(): Promise<void> {
        this.logger.info("Opening cart");

        await this.cartButton.click();

        await this.screenshot.captureStep(this.page, "Cart Page Opened", { fullPage: true });
    }

    // Complete Add to Cart Flow
    async addBackpackAndOpenCart(): Promise<void> {
        await this.addBackpackToCart();
        await this.verifyCartBadgeCount("1");
        await this.openCart();
    }
}