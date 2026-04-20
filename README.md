#  Liverpool QA Automation – Playwright + TypeScript

##  Descripción

Este proyecto implementa pruebas automatizadas end-to-end (E2E) para el sitio de e-commerce **Liverpool México**, utilizando **Playwright con TypeScript**.

El objetivo es validar flujos críticos de usuario como:

* Navegación por categorías
* Selección de productos
* Agregado al carrito
* Validaciones del estado del carrito

---

##  Tecnologías utilizadas

* **Playwright**
* **TypeScript**
* **Node.js**
* **Page Object Model (POM)**

---

##  Estructura del proyecto
```
liverpool-playwright-pom/
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── README.md
├── data/
├── locators/
│   ├── HomeLocators.ts
│   ├── LoginLocators.ts
├── pages/
│   ├── BasePage.ts
│   ├── CartPage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductPage.ts
├── playwright-report/
├── test-data/
├── test-results/
├── tests/
│   ├── AgregarProductosCadaCategoria.spec.ts
│   ├── excel-validation.spec.ts
│   ├── InspectSelectors.spec.ts
│   ├── LoginTest.spec.ts
├── utils/
│   ├── ExcelReader.ts
```

---

##  Instalación

1. Clonar el repositorio:

```
git clone https://github.com/ilverpenaloza94/Liverpool-automation.git
cd Liverpool-automation
```

2. Instalar dependencias:

```
npm install
```

3. Instalar navegadores de Playwright:

```
npx playwright install
```

---

##  Ejecución de pruebas

Ejecutar todos los tests:

```
npx playwright test
```

Ejecutar en modo debug (recomendado):

```
npx playwright test --debug
```

Ejecutar un test específico:

```
npx playwright test tests/AgregarProductosCadaCategoria.spec.ts
```

---

##  Casos de prueba implementados

---

###  Casos Funcionales

| ID | Archivo | Descripción | Validación |
|----|---------|-------------|------------|
| TC-001 | `LoginTest.spec.ts` | Login con credenciales válidas leídas desde Excel y navegación a zapatos de hombre | El flujo completa sin errores y el `page` está definido |
| TC-002 | `AgregarBotasHombreABolsa.spec.ts` | Navegar a la categoría de botas de hombre y agregar el primer resultado a la bolsa | El flujo completa sin errores |
| TC-003 | `AgregarLaptopLenovoABolsa.spec.ts` | Buscar laptops Lenovo y agregar la primera encontrada a la bolsa | Se muestra el mensaje `"Agregaste un producto a tu"` |
| TC-004 | `AgregarMocasinesHombreABolsa.spec.ts` | Navegar a mocasines de hombre, seleccionar talla `27 cm` y agregar a la bolsa | El flujo completa sin errores |
| TC-005 | `AgregarPantallaSonyABolsa.spec.ts` | Buscar pantallas Sony y agregar la primera encontrada a la bolsa | Se muestra el mensaje `"Agregaste un producto a tu"` |
| TC-006 | `NavegarLocionesYRegresarHome.spec.ts` | Navegar a la sección de lociones y regresar a la página principal | La URL contiene `/tienda/home` |

---

###  Casos Negativos

| ID | Flujo relacionado | Descripción | Resultado esperado |
|----|-------------------|-------------|-------------------|
| TC-N01 | Login | Intentar login con correo válido y contraseña incorrecta | Se muestra mensaje de error de credenciales |
| TC-N02 | Login | Intentar login con campos vacíos (sin email ni contraseña) | Se muestran mensajes de validación de campos requeridos |
| TC-N03 | Login | Intentar login con formato de correo inválido (ej. `usuario@`) | El campo email muestra error de formato |
| TC-N04 | Agregar a bolsa | Intentar agregar un producto sin seleccionar talla (cuando es requerida) | Se muestra alerta indicando que se debe seleccionar talla |
| TC-N05 | Navegación | Buscar un producto con texto que no existe (ej. `xyzproductofalso123`) | Se muestra página de sin resultados o mensaje de "no encontramos productos" |
| TC-N06 | Carrito | Intentar proceder a pago con bolsa vacía | El botón de pago está deshabilitado o redirige con mensaje de bolsa vacía |

---

###  Edge Cases (Casos Límite)

| ID | Flujo relacionado | Descripción | Resultado esperado |
|----|-------------------|-------------|-------------------|
| TC-E01 | Agregar a bolsa | Agregar el mismo producto múltiples veces consecutivas | El contador de la bolsa incrementa correctamente cada vez |
| TC-E02 | Navegación | Navegar hacia atrás con el botón del navegador después de agregar un producto | La bolsa conserva el producto agregado |
| TC-E03 | Login | Iniciar sesión con credenciales que tienen espacios en blanco al inicio/final | El sistema limpia los espacios o muestra error controlado |
| TC-E04 | Agregar a bolsa | Agregar un producto cuando la sesión del usuario ha expirado | Se redirige al login o se muestra mensaje de sesión expirada |
| TC-E05 | Búsqueda / Categorías | Cargar categoría con lazy loading lento (conexión lenta simulada) | Los elementos se esperan correctamente con auto-wait de Playwright |
| TC-E06 | Popup / Overlay | Aparición de popup de cookies o promoción al cargar la home | El flujo cierra el popup y continúa sin fallar |
| TC-E07 | Talla | Intentar agregar mocasines con una talla que está agotada | Se muestra indicador de talla no disponible y no se agrega al carrito |

---

##  Estrategia de automatización

###  Page Object Model (POM)

Se implementó POM para:

* Separar lógica de negocio y pruebas
* Facilitar mantenimiento
* Mejorar reutilización de código

---

###  Estrategia de selectores

Se priorizó el uso de:

1. `getByTestId()` → identificadores únicos
2. `getByRole()` → accesibilidad (recomendado por Playwright)
3. `getByText()` → cuando no hay alternativa
4. `locator()` → casos específicos

Se evitaron:

* XPath innecesarios
* Clases dinámicas
* Selectores frágiles

---

###  Manejo de sincronización

* Uso de `expect().toBeVisible()` para esperar estados
* Eliminación de `waitForTimeout`
* Aprovechamiento de auto-wait de Playwright

---

##  Riesgos identificados

* Elementos duplicados (desktop vs mobile)
* Cambios en el DOM del sitio
* Contenido dinámico (lazy loading)
* Popups (cookies/promociones)
* Dependencia de conexión a internet

---

##  Mejoras futuras

* Integración con CI/CD (GitHub Actions)
* Generación de reportes avanzados (Allure)
* Uso de variables de entorno (.env)
* Implementación de fixtures avanzados
* Mocking de servicios

---

##  Reportes

Los reportes HTML se generan automáticamente en:

```
playwright-report/
```

Incluyen:

* Evidencias (screenshots/videos)
* Trazas de ejecución
* Resultados detallados

---

##  Video demostrativo

Se incluye un video explicando:

* Arquitectura del proyecto
* Ejecución de pruebas
* Decisiones técnicas

---





