# Vue Challenge | Ernesto Rangel | CPlug

Project developed by [Ernesto Rangel](https://ernestorangel.dev) as a tech challenge to [ConnectPlug](https://www.cplug.com.br/)

## About the project

**Technologies used:**

- [Vue 3](https://vuejs.org/) (Composition API)
- [Vite](https://vitejs.dev/) (build tool)
- [Pinia](https://pinia.vuejs.org/) (state management)
- [Vue Router](https://router.vuejs.org/) (routing)
- [Vitest](https://vitest.dev/) (unit testing)
- [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (PWA support)
- [TypeScript](https://www.typescriptlang.org/)

**Main features:**

- Product listing and shopping cart
- Checkout flow with success and error feedback
- Alert system for user notifications
- Responsive layout for desktop and mobile
- PWA support (installable, offline-ready)
- Automatic dark/light mode based on browser or system preference
- Unit tests with coverage

## Running the project

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

Access the address shown in the terminal.

## Testing the PWA

### 3. Build for production (PWA)

```bash
npm run build
```

### 4. Run the production preview (simulates PWA)

```bash
npm run preview
```

Access the address shown in the terminal.

Then you will be able to install the PWA as a local app.

## Unit Tests

### Run unit tests

```bash
npm run test
```

### Generate test coverage report

```bash
npm run coverage
```

The report will be generated in the `coverage/` folder and can be opened in your browser (`coverage/index.html`).
