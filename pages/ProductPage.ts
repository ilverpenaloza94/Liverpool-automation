import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  private addToCartButton = 'button[data-testid="add-to-cart"]';
  private cartIcon = '.cart-icon';

  constructor(page: Page) {
    super(page);
  }

  async searchAndAddProduct(productName: string) {
    // Asumiendo que hay un campo de búsqueda; ajustar según el sitio real
    await this.page.fill('input[placeholder*="buscar"]', productName);
    await this.page.press('Enter');
    await this.waitForLoad();
    // Seleccionar el primer producto y agregar al carrito
    await this.page.click('.product-item:first-child');
    await this.page.click(this.addToCartButton);
  }

  async goToCart() {
    await this.page.click(this.cartIcon);
    await this.waitForLoad();
  }
}