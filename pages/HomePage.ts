
import { Page } from '@playwright/test';
import { HomeLocators } from '../locators/HomeLocators';

export class HomePage {
  page: Page;
  constructor(page: Page) {
    this.page = page;
  }
//Metodo para agregar botas o mocasines de hombre, dependiendo del tipo que se le indique. El método se encarga de abrir la categoría correcta, 
// intentar agregar productos y manejar casos donde no hay stock o se requiere seleccionar talla.
  private async abrirCategoriaZapatosHombre(tipo: 'botas' | 'mocasines') {
    await HomeLocators.categoriesButton(this.page).click();
    await HomeLocators.zapatosChevron(this.page).click();
    await HomeLocators.headingZapatos(this.page).waitFor({ state: 'visible' });
    await HomeLocators.linkHombre(this.page).click();

    if (tipo === 'botas') {
      await HomeLocators.linkBotas(this.page).click();
      return;
    }

    await HomeLocators.linkMocasines(this.page).click();
  }

  private async intentarAgregarProductoConReintento(requiereTalla = false, talla = '27 cm') {
    const productos = HomeLocators.productosListado(this.page);
    let total = await productos.count();

    if (total === 0) {
      const primeraTarjeta = HomeLocators.primeraTarjetaVisible(this.page);
      await primeraTarjeta.waitFor({ state: 'visible', timeout: 10000 });
      await primeraTarjeta.click();
      await this.page.waitForLoadState('domcontentloaded');
      total = await HomeLocators.productosListado(this.page).count();
    }

    if (requiereTalla && total > 0) {
      const filtroTalla = HomeLocators.filtroRapido(this.page, talla);
      if (await filtroTalla.isVisible().catch(() => false)) {
        await filtroTalla.click();
        await this.page.waitForLoadState('domcontentloaded');
        total = await HomeLocators.productosListado(this.page).count();
      }
    }

    let agregado = false;

    if (total === 0 && await HomeLocators.agregarBolsaButton(this.page).isVisible().catch(() => false)) {
      agregado = await this.intentarAgregarEnDetalle(requiereTalla, talla);
    }

    for (let i = 1; i <= total; i++) {
      if (agregado) {
        break;
      }
      const producto = HomeLocators.productoListadoPorIndice(this.page, i);
      await producto.waitFor({ state: 'visible' });
      await producto.click();
      agregado = await this.intentarAgregarEnDetalle(requiereTalla, talla);
      if (agregado) {
        break;
      }

      if (i < total) {
        await this.page.goBack();
        await this.page.waitForLoadState('domcontentloaded');
      }
    }

    return agregado;
  }

  private async intentarAgregarEnDetalle(requiereTalla: boolean, talla: string) {
    await HomeLocators.agregarBolsaButton(this.page).waitFor({ state: 'visible' });
    await HomeLocators.agregarBolsaButton(this.page).click();

    const mensajeAgregado = HomeLocators.mensajeAgregado(this.page);
    const mensajeNoInventario = HomeLocators.mensajeNoInventario(this.page);
    const mensajeSeleccionaTamaño = HomeLocators.mensajeSeleccionaTamaño(this.page);

    try {
      await Promise.race([
        mensajeAgregado.waitFor({ state: 'visible', timeout: 5000 }),
        mensajeNoInventario.waitFor({ state: 'visible', timeout: 5000 }),
        mensajeSeleccionaTamaño.waitFor({ state: 'visible', timeout: 5000 })
      ]);
    } catch {}

    if (requiereTalla && await mensajeSeleccionaTamaño.isVisible().catch(() => false)) {
      await HomeLocators.seleccionaTalla(this.page).click();
      await HomeLocators.opcionTalla(this.page, talla).click();
      await HomeLocators.agregarBolsaButton(this.page).click();

      try {
        await Promise.race([
          mensajeAgregado.waitFor({ state: 'visible', timeout: 5000 }),
          mensajeNoInventario.waitFor({ state: 'visible', timeout: 5000 })
        ]);
      } catch {}
    }

    if (await mensajeAgregado.isVisible().catch(() => false)) {
      return true;
    }

    if (await mensajeNoInventario.isVisible().catch(() => false)) {
      return false;
    }

    if (requiereTalla && await mensajeSeleccionaTamaño.isVisible().catch(() => false)) {
      return false;
    }

    return false;
  }

  async agregarPrimerBotasHombreABolsa() {
    await this.abrirCategoriaZapatosHombre('botas');
    const agregado = await this.intentarAgregarProductoConReintento(false);
    if (!agregado) {
      throw new Error('No se pudo agregar ningún producto de Botas a la bolsa.');
    }
  }

  async agregarPrimerMocasinesHombreABolsa(talla = '27 cm') {
    await this.abrirCategoriaZapatosHombre('mocasines');
    const agregado = await this.intentarAgregarProductoConReintento(true, talla);
    if (!agregado) {
      throw new Error('No se pudo agregar ningún producto de Mocasines a la bolsa.');
    }
  }
//Metodo para navegar a la sección de lociones dentro de perfumes y cuidado personal,
//  y luego regresar al home. Este flujo es parte de las pruebas para validar la navegación entre categorías
  async navegarALocionesYRegresarHome() {
    await HomeLocators.categoriesButton(this.page).click();
    await HomeLocators.hombreChevron(this.page).click();
    await HomeLocators.linkPerfumes(this.page).click();
    await HomeLocators.linkLociones(this.page).click();
    await this.page.waitForLoadState('domcontentloaded');
    await HomeLocators.linkHome(this.page).click();
  }

  // Agrega la primera pantalla Sony 
  async agregarPrimeraPantallaSonyABolsa() {
    await HomeLocators.categoriesButton(this.page).click();
    await HomeLocators.electronicaChevron(this.page).click();
    await HomeLocators.headingElectronica(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await HomeLocators.linkTVVideo(this.page).click();
    try {
      await HomeLocators.articulosTVHeading(this.page).waitFor({ state: 'visible', timeout: 7000 });
    } catch (e) {
  // Si no sale el encabezado, continúo igual porque a veces no aparece pero sí salen los productos
    }
    const pantallasLink = await HomeLocators.linkPantallas(this.page).first();
    await pantallasLink.scrollIntoViewIfNeeded();
    await pantallasLink.click();
    const busquedaInput = HomeLocators.busquedaRapidaInput(this.page);
    await busquedaInput.waitFor({ state: 'visible', timeout: 7000 });
    await busquedaInput.fill('SONY');
    await this.page.keyboard.press('Enter');
    const sonyCheckbox = HomeLocators.marcaSonyCheckbox(this.page);
    await sonyCheckbox.waitFor({ state: 'visible', timeout: 10000 });
    await sonyCheckbox.scrollIntoViewIfNeeded();
    await sonyCheckbox.click();
    await this.page.waitForTimeout(1500);
    await HomeLocators.productosListado(this.page).first().waitFor({ state: 'visible', timeout: 10000 });
    const primerProducto = HomeLocators.productosListado(this.page).first();
    await primerProducto.scrollIntoViewIfNeeded();
    await primerProducto.click();
    const mensajeSeleccionaTamaño = HomeLocators.mensajeSeleccionaTamaño(this.page);
    if (await mensajeSeleccionaTamaño.isVisible().catch(() => false)) {
      await HomeLocators.seleccionaTalla(this.page).click();
      // Si pide talla, selecciono la primera que haya
      const primeraOpcion = this.page.locator('ul[role="listbox"] li[role="option"]').first();
      await primeraOpcion.waitFor({ state: 'visible', timeout: 5000 });
      await primeraOpcion.click();
    }
    const agregarBolsaBtn = HomeLocators.agregarBolsaButton(this.page);
    let botonVisible = true;
    try {
      await agregarBolsaBtn.waitFor({ state: 'visible', timeout: 15000 });
    } catch (e) {
      botonVisible = false;
      // Si no aparece el botón, probablemente no hay stock
    }
    if (botonVisible) {
      // Espero a que el botón esté listo para usarse
      await this.page.waitForFunction(
        (el) => !!el && !el.hasAttribute('disabled') && !el.classList.contains('is-disabled'),
        await agregarBolsaBtn.elementHandle(),
        { timeout: 15000 }
      );
      try {
        await agregarBolsaBtn.click({ timeout: 10000 });
      } catch (e) {
        // Si truena el click, reviso si hay mensaje de error
        const mensajeError = await this.page.locator('text=/no contamos con el inventario|agotado|no disponible/i').first();
        if (await mensajeError.isVisible().catch(() => false)) {
          throw new Error('No se pudo agregar el producto: ' + await mensajeError.textContent());
        } else {
          throw e;
        }
      }
    } else {
      // Si de plano no hay botón, ya no sigo
      throw new Error('No se pudo agregar el producto porque el botón de agregar no está visible.');
    }
    try {
      await HomeLocators.noGraciasProteccion(this.page).click({ timeout: 3000 });
    } catch (e) {
      // Si no sale el pop-up, no pasa nada
    }
    await this.page.waitForFunction(() => {
      const el = document.evaluate("//*[contains(text(),'Agregaste un producto a tu')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return el && (el as HTMLElement).offsetParent !== null;
    }, null, { timeout: 20000 });
    const contadorBolsa = HomeLocators.contadorBolsa(this.page, '1');
    await contadorBolsa.waitFor({ state: 'visible', timeout: 10000 });
    await contadorBolsa.click();
    await this.page.waitForLoadState('domcontentloaded');
    const checkoutButton = this.page.locator('button[data-testid="checkout"]');
    if (await checkoutButton.isVisible().catch(() => false)) {
      await checkoutButton.click();
      await this.page.waitForLoadState('domcontentloaded');
    }
  }
  // Agrega la primera laptop Lenovo que encuentre al carrito
  async agregarPrimerLaptopLenovoABolsa() {
    await HomeLocators.categoriesButton(this.page).click();
    await HomeLocators.electronicaChevron(this.page).click();
    await HomeLocators.headingElectronica(this.page).waitFor({ state: 'visible', timeout: 10000 });
    await HomeLocators.linkComputacion(this.page).click();
    await HomeLocators.linkLaptops(this.page).click();
    await HomeLocators.filtroLenovo(this.page).click();
    await this.page.waitForTimeout(1500);
    await HomeLocators.productosListado(this.page).first().waitFor({ state: 'visible', timeout: 10000 });
    const primerProducto = HomeLocators.productosListado(this.page).first();
    await primerProducto.scrollIntoViewIfNeeded();
    await primerProducto.click();
    await HomeLocators.agregarBolsaButton(this.page).click();
    try {
      await HomeLocators.noGraciasProteccion(this.page).click({ timeout: 3000 });
    } catch (e) {
      // Si no sale el pop-up, no pasa nada
    }
    await this.page.waitForFunction(() => {
      const el = document.evaluate("//*[contains(text(),'Agregaste un producto a tu')]", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
      return el && (el as HTMLElement).offsetParent !== null;
    }, null, { timeout: 20000 });
    await HomeLocators.linkHome(this.page).click();
    // Listo, ya regresé al inicio
  }
}