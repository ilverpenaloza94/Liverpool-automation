import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

test('Flujo 3: Navegar a Lociones y regresar a Home', async ({ page }) => {
  const homePage = new HomePage(page);
  await page.goto('https://www.liverpool.com.mx/tienda/home');
  await homePage.navegarALocionesYRegresarHome();
  // Validación final: ¿Estamos en Home?
  await expect(page).toHaveURL(/.*\/tienda\/home/);
});