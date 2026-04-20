import { Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { LoginLocators } from '../locators/LoginLocators';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Visualización de la pagina de login
  async irInicioSesion(): Promise<void> {
    await this.page.goto('/tienda/home');
    await expect(this.page.locator(LoginLocators.loginButton1)).toBeVisible();
    await this.page.click(LoginLocators.loginButton1);
    await expect(this.page.locator(LoginLocators.emailInput)).toBeVisible();
  }

  // Ingreso de credenciales válidas
  async ingresarCredenciales(email: string, password: string): Promise<void> {
    await this.page.fill(LoginLocators.emailInput, email);
    await this.page.fill(LoginLocators.passwordInput, password);
  }

  // Envío del formulario de login
  async submitLogin(): Promise<void> {
    await Promise.all([
      this.page.waitForLoadState('networkidle'),
      this.page.click(LoginLocators.loginButton),
    ]);
  }

  // Solución para manejar MFA (Multi-Factor Authentication) (Tempora)
  async handleMFA(manual: boolean = true): Promise<void> {
    if (manual) {
      console.warn('⚠️ Esperando ingreso manual de código MFA...');
      await this.page.pause();
    } else {
      throw new Error('MFA automático no implementado');
    }
  }

  // Método principal 
  async login(email: string, password: string, options?: { mfa?: boolean }): Promise<void> {
    await this.irInicioSesion();
    await this.ingresarCredenciales(email, password);
    await this.submitLogin();

    if (options?.mfa) {
      await this.handleMFA(true);
    }


  }

}
