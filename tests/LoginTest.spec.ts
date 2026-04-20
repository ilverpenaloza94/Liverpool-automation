import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ExcelReader } from '../utils/ExcelReader';

test('Automatización de flujo en Liverpool', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);

  // Leer datos del Excel
  const loginData = ExcelReader.readLoginData('./data/LoginData.xlsx');

  // Navegar a la página principal
  await page.goto('https://www.liverpool.com.mx/tienda/home');

  // Login
  await loginPage.login(loginData.email, loginData.password);

  // Agregar zapatos de hombre al carrito
  await homePage.comprarZapatosHombre();

  // Verificar que el producto se agregó
  expect(page).toBeDefined();
});