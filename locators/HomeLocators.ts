import { Page } from '@playwright/test';

export const HomeLocators = {
  // Botón para abrir el menú de categorías
  categoriesButton: (page: Page) => page.getByTestId('blt26617d4f2e17657d-header-button-category'),
  // Despliega los submenús de cada sección
  zapatosChevron: (page: Page) => page.getByText('Zapatoschevron_right'),
  hombreChevron: (page: Page) => page.getByText('Hombrechevron_right'),
  electronicaChevron: (page: Page) => page.getByText('Electrónicachevron_right'),
  videojuegosChevron: (page: Page) => page.getByText('Videojuegoschevron_right'),
  // Encabezados que aparecen en cada sección
  headingZapatos: (page: Page) => page.getByRole('heading', { name: 'ZAPATOS', exact: true }),
  headingElectronica: (page: Page) => page.getByRole('heading', { name: 'ELECTRÓNICA', exact: true }),
  headingVideojuegos: (page: Page) => page.getByRole('heading', { name: 'VIDEOJUEGOS', exact: true }),
  articulosTVHeading: (page: Page) =>  page.getByRole('heading', { name: /Artículos.*TV.*video/i }),
  // Enlaces a las diferentes secciones y filtros
  busquedaRapidaInput: (page: Page) =>  page.getByRole('textbox', { name: 'Búsqueda rápida' }),
  linkHombre: (page: Page) => page.getByRole('link', { name: 'Hombre', exact: true }),
  linkBotas: (page: Page) => page.getByRole('complementary').getByRole('link', { name: 'Botas' }),
  linkMocasines: (page: Page) => page.getByRole('complementary').getByRole('link', { name: 'Mocasines de Hombre' }),
  linkPerfumes: (page: Page) => page.getByRole('link', { name: 'Perfumes y Cuidado Personal' }),
  linkLociones: (page: Page) => page.getByRole('complementary').getByRole('link', { name: 'Lociones' }),
  linkComputacion: (page: Page) => page.getByRole('link', { name: 'Computación' }),
  linkLaptops: (page: Page) => page.locator('section').getByRole('link', { name: 'Laptops' }),
  linkElectrónica: (page: Page) => page.getByRole('link', { name: 'Electrónica' }),
  linkTVVideo: (page: Page) => page.getByRole('link', { name: 'TV y Video' }),
  linkPantallas: (page: Page) => page.getByRole('link', { name: 'Pantallas' }),
  linkGaming: (page: Page) => page.getByRole('link', { name: 'Gaming' }),
  linkXBOX: (page: Page) => page.getByRole('link', { name: 'XBOX', exact: true }),
  linkConsolasXbox: (page: Page) => page.getByRole('complementary').getByRole('link', { name: 'Consolas Xbox' }),
  marcasSection: (page: Page) => page.locator('#Marcas'),
  // Filtros por marca
  filtroLenovo: (page: Page) => page.locator('div').filter({ hasText: /^LENOVO$/ }),
  filtroMicrosoft: (page: Page) => page.locator('#brand-MICROSOFT'),
   marcaSonyCheckbox: (page: Page) => page.locator('#brand-SONY'),
  // Ejemplos de productos específicos (ajusta el texto si cambian)
  productoDockers: (page: Page) => page.getByRole('link').filter({ hasText: 'DOCKERSBotín de piel para hombre' }),
  productoJBEMocasin: (page: Page) => page.getByRole('link').filter({ hasText: 'JBEMocasín para hombre' }),
  productoMontblanc: (page: Page) => page.getByRole('link').filter({ hasText: 'MONTBLANCParfum' }),
  productoLenovo: (page: Page) => page.getByRole('link').filter({ hasText: 'LENOVOLaptop touch' }),
  productoSonyTV: (page: Page) => page.getByRole('link').filter({ hasText: 'SONYPantalla Smart TV LCD' }),
  productoXbox: (page: Page) => page.getByRole('link').filter({ hasText: 'MICROSOFTConsola fija xbox one series x' }),
  productosListado: (page: Page) => page.locator('//main//ul[contains(@class,"m-product__listingPlp")]/li'),
  productoListadoPorIndice: (page: Page, indice: number) => page.locator(`(//main//ul[contains(@class,"m-product__listingPlp")]/li)[${indice}]`),
  primeraTarjetaVisible: (page: Page) => page.locator('(//main//*[self::a or self::div][.//img and normalize-space(.) and not(descendant::button)])[1]'),
  filtroRapido: (page: Page, texto: string) => page.locator('main').getByText(texto, { exact: true }),
  // Botones principales y acciones en la página
  agregarBolsaButton: (page: Page) => page.getByRole('button', { name: 'Agregar a mi bolsa' }),
  seleccionaTalla: (page: Page) => page.getByText('Selecciona', { exact: true }),
  talla27cm: (page: Page) => page.getByRole('link', { name: '27 cm' }),
  opcionTalla: (page: Page, talla: string) => page.getByRole('link', { name: talla }),
  noGraciasProteccion: (page: Page) => page.getByText('No, gracias'),
  // Mensajes que aparecen al agregar productos o si no hay inventario
  mensajeNoInventario: (page: Page) => page.getByText('No contamos con el inventario'),
  mensajeSeleccionaTamaño: (page: Page) => page.getByText('Selecciona Tamaño'),
  mensajeAgregado: (page: Page) => page.getByText('Agregaste un producto a tu'),
  // Contador de productos en la bolsa
  contadorBolsa: (page: Page, cantidad: string) => page.getByRole('button', { name: cantidad }),
  // Otros elementos útiles
  marcasDropdown: (page: Page) => page.locator('#Marcas'),
  // Enlace para regresar al inicio
  linkHome: (page: Page) => page.getByRole('link', { name: 'Home' }),
};
