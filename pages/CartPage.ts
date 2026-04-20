import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  private checkoutButton = 'button[data-testid="checkout"]';

  constructor(page: Page) {
    super(page);
  }

  async proceedToCheckout() {
    await this.page.click(this.checkoutButton);
    await this.waitForLoad();
  }
}