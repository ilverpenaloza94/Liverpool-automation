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
git clone <TU_REPO_URL>
cd liverpool-qa-automation
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

###  Flujo principal

* Navegar a categorías
* Seleccionar productos (botas y mocasines)
* Agregar productos al carrito
* Validar mensaje de agregado
* Validar contador del carrito

---

###  Casos negativos (sugeridos)

* Búsqueda de producto inexistente
* Intento de compra sin productos

---

###  Edge cases (casos límite)

* Agregar múltiples veces el mismo producto
* Validación de carrito vacío
* Manejo de elementos dinámicos (lazy loading)

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





