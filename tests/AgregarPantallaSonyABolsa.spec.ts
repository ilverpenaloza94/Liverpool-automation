import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';

// Prueba para agregar la primera pantalla Sony que encuentre al carrito
test('Agregar pantalla Sony a la bolsa', async ({ page }) => {
  // Abro la página principal de Liverpool
  await page.goto('https://www.liverpool.com.mx/tienda/home');

  // Creo la instancia de la página principal
  const homePage = new HomePage(page);

  // Llamo el flujo que agrega la pantalla Sony
  await homePage.agregarPrimeraPantallaSonyABolsa();

  // Verifico que salga el mensaje de producto agregado
  await expect(page.getByText('Agregaste un producto a tu')).toBeVisible();
});
