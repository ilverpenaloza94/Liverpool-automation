import { Page } from '@playwright/test';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
  }

  async waitForLoad() {
    // Espero a que cargue lo básico de la página
    await this.page.waitForLoadState('domcontentloaded');
    // Y le doy unos segundos extra por si hay cosas dinámicas
    await this.page.waitForTimeout(5000);
  }
}