import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { HomeLocators } from '../locators/HomeLocators';

test('Inspeccionar estructura de página del producto', async ({ page }) => {
  const homePage = new HomePage(page);

  // Navegar a la página principal
  await page.goto('https://www.liverpool.com.mx/tienda/home');
  await homePage.waitForLoad();

  // Seleccionar categoría
  await homePage.seleccionarCategoria();
  
  // Seleccionar Hombre
  await page.click(HomeLocators.categoriaHombreLink);
  await homePage.waitForLoad();
  
  // Seleccionar Zapatos
  await page.click(HomeLocators.zapatosLink);
  await homePage.waitForLoad();
  
  // Seleccionar Botas
  await page.click(HomeLocators.botasLink);
  await homePage.waitForLoad();

  // Seleccionar primer producto
  await page.click(HomeLocators.primerProductoSelect);
  await homePage.waitForLoad();

  console.log('=== INSPECCIONANDO ESTRUCTURA DE PÁGINA ===');

  // Esperar más y ver si carga el botón
  await page.waitForTimeout(3000);
  console.log('Esperé 3 segundos adicionales');

  // Buscar el botón nuevamente
  const btnAgregar = await page.locator(HomeLocators.agregarAlCarritoButton).count();
  console.log(`Selector #opc_pdp_addCartButton: ${btnAgregar} elementos`);

  // Buscar cualquier botón en la página
  const todosLosBotones = await page.locator('//button').count();
  console.log(`Total de botones en la página: ${todosLosBotones}`);

  // Buscar iframes
  const iframes = await page.locator('//iframe').count();
  console.log(`Total de iframes: ${iframes}`);

  // Buscar elementos con clases relacionadas a carrito
  const carritoElements = await page.locator('//*[contains(@class, "cart") or contains(@class, "add") or contains(@id, "cart") or contains(@id, "add")]').count();
  console.log(`Elementos relacionados a carrito/agregar: ${carritoElements}`);

  // Mostrar el HTML de la página (primeras líneas)
  const bodyHtml = await page.evaluate(() => {
    return document.body.outerHTML.substring(0, 500);
  });
  console.log(`\nPrimeras líneas del HTML:`);
  console.log(bodyHtml);

  // Si hay iframes, investigar adentro
  if (iframes > 0) {
    console.log(`\n✓ Se encontraron ${iframes} iframes`);
    const frameLocator = page.locator('//iframe').first();
    try {
      const frame = await frameLocator.contentFrame();
      if (frame) {
        const botonesEnFrame = await frame.locator('//button').count();
        console.log(`  Botones dentro del iframe: ${botonesEnFrame}`);
      }
    } catch (e) {
      console.log(`  No se pudo acceder al iframe: ${e.message}`);
    }
  }

  console.log('=== TEST COMPLETADO ===');
});
