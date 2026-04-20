
// Prueba para agregar el primer par de mocasines de hombre al carrito
import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';


test('Agregar mocasines de hombre a la bolsa', async ({ page }) => {
  await page.goto('/');
  const homePage = new HomePage(page);
  await homePage.agregarPrimerMocasinesHombreABolsa('27 cm');
});
