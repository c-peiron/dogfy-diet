## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Testing

```bash
# npm
npm run test

# pnpm
pnpm test

# yarn
yarn test

# bun
bun run test
```

## Notes
- El stepper guarda el historial de los pasos. Si se accede en un paso avanzado, volver atrás desde el navegador permite viajar a través de los pasos previos.
- Existe un Modal que previene de salir completamente del stepper.
- Los datos persisten en LocalStorage, tanto del formulario, como del TestA/B como el último step.
- Desde la Home es posible forzar un TestA/B para validar el Step6.
- Se ha testeado tanto la fakePetition de razas a través de arquitectura hexagonal como el componente más complejo, el de Autocompletar.