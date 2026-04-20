import { test } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Prueba para agregar el primer par de botas de hombre al carrito

test('Agregar botas de hombre a la bolsa', async ({ page }) => {
  // Abro la página principal (el baseURL ya está puesto en la config)
  await page.goto('/');

  // Creo la instancia de la página principal
  const homePage = new HomePage(page);

  // Llamo el flujo que agrega las botas
  await homePage.agregarPrimerBotasHombreABolsa();

  // Si quieres, aquí puedes validar que el botón de la bolsa muestre "1"
  // await expect(page.getByRole('button', { name: '1' })).toBeVisible();
});
