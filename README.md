# challenge-monet-jcs

Proyecto único que contempla **automation** y **performance**, tal como solicita el challenge. Incluye:

- Pruebas **API** con Playwright + TypeScript sobre `GET https://pokeapi.co/api/v2/pokemon/{id or name}`.
- Pruebas **web** con Playwright + TypeScript sobre PHPTravels.
- Pruebas **performance** con **k6** sobre `POST https://dummyjson.com/products/add` con 50 TPS y 100 TPS.
- Manejo de **múltiples ambientes** (`qa` y `cert`) y logueo del secreto **hasheado con SHA-256** antes de cada test.
- Archivo `README.md` con instrucciones completas de ejecución.

## Requisitos

- Node.js 20+
- npm 10+
- k6 instalado y disponible en PATH (`k6 version`)

## Instalación

```bash
npm install
npx playwright install
```

## Configuración de ambientes y secretos

Crea un archivo `.env` en la raíz usando `.env.example` como base.

Ejemplo:

```env
TEST_ENV=qa
SECRET_QA=7b5880f7-a781-4b39-9ceb-f8e3bfbce32d
SECRET_CERT=8ca330f7-a781-4b39-9ceb-f8e3bf51366a
PHPTRAVELS_FIRST_NAME=Juan
PHPTRAVELS_LAST_NAME=Salazar
PHPTRAVELS_BUSINESS_NAME=QA Labs
PHPTRAVELS_COUNTRY=Peru
PHPTRAVELS_WHATSAPP=999888777
PHPTRAVELS_EMAIL=qa.automation@example.com
```

### Importante

- El secreto **no está hardcodeado** en el código.
- Antes de cada test Playwright, el framework toma el secreto del ambiente activo, lo convierte a **SHA-256** y lo loguea por consola.
- Si quieres ejecutar contra `cert`, cambia:

```env
TEST_ENV=cert
```

## Datos de prueba para API

El proyecto incluye un archivo `data/Datos-pruebas.xlsx` de ejemplo para que la suite sea ejecutable sin depender de archivos externos.

Si deseas usar el archivo entregado por el challenge, solo reemplázalo manteniendo la misma ruta:

```text
data/Datos-pruebas.xlsx
```

## Estructura del proyecto

```text
challenge-monet-jcs/
├── data/
│   └── Datos-pruebas.xlsx
├── src/
│   ├── config/
│   ├── fixtures/
│   └── utils/
├── tests/
│   ├── api/
│   └── web/
├── performance/
├── reports/
├── scripts/
├── package.json
└── README.md
```

## Ejecución de automation

### Todas las pruebas Playwright

```bash
npm test
```

### Solo API

```bash
npm run test:api
```

### Solo web

```bash
npm run test:web
```

### Abrir reporte Playwright

```bash
npm run report
```

## Qué cubre cada suite

### API: `tests/api/pokemon.spec.ts`

- Lee `Datos-pruebas.xlsx`
- Ejecuta una prueba por `id` y otra por `name`
- Valida status code
- Valida nombre/id esperados
- Valida habilidades
- Valida tiempo de respuesta menor a 10 segundos
- Loguea fecha y hora al finalizar mediante fixture/base test

### Web: `tests/web/phptravels-demo-request.spec.ts`

- Abre `https://phptravels.com/demo`
- Completa el formulario de solicitud de demo
- Intenta resolver el captcha de suma simple si aparece
- Valida que se muestre `Demo Access Granted!`

### Web opcional: `tests/web/phptravels-payment.spec.ts`

Esta prueba usa credenciales de demo previamente obtenidas.

Debes definir estas variables si deseas activarla:

```env
PHPTRAVELS_FRONTEND_URL=
PHPTRAVELS_USERNAME=
PHPTRAVELS_PASSWORD=
```

Además, puede usar tarjetas de prueba de Stripe en sandbox, por ejemplo `4242424242424242`, fecha futura y cualquier CVC. Si el DOM real del checkout cambia, ajusta los locators de Stripe en `src/utils/phptravels.ts`.


