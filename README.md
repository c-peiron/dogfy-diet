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

# 📘 Documentación del Módulo de Razas (Arquitectura Hexagonal + DDD)

Esta documentación describe la estructura, flujo de datos y puntos de extensión del módulo de razas implementado con arquitectura hexagonal y principios de Domain-Driven Design (DDD).

---

## 🔄 Flujo General de Datos

```text
[ Componente UI ]
       │
       ▼
[ Caso de Uso GetAllBreeds ]
       │
       ▼
[ IBreedRepository (interface) ]
       │
       ▼
[ Infraestructura (FakeBreedRepository o API) ]
       │
       ▼
[ Datos de razas → Breed[] ]
```

---

## 🧱 Capas del Sistema

### 🧠 Dominio (`/domain`)

* **Entidades**: `Breed`
* **Interfaces**: `IBreedRepository`

Define las reglas de negocio sin dependencias externas.

### 🚀 Aplicación (`/application`)

* **Casos de uso**: `GetAllBreeds`

Orquesta la lógica llamando a repositorios y entidades.

### 🔌 Infraestructura (`/infrastructure`)

* **Implementaciones**: `FakeBreedRepository`, `HttpBreedRepository`

Implementan interfaces del dominio y contienen la lógica de acceso a datos (mock o real).

### 🗒 Interfaz de Usuario (`/components`, `pages`)

* Renderiza los datos obtenidos por los casos de uso.

---

## 📄 Interfaces Clave y Contratos

### `Breed` (entidad de dominio)

```ts
export class Breed {
  constructor(
    public name: string,
    public count: number
  ) {}
}
```

### `IBreedRepository`

```ts
export interface IBreedRepository {
  findAll(): Promise<Breed[]>;
}
```

> Permite que la capa de aplicación no dependa de cómo se obtienen los datos.

---

## 🌟 Puntos de Extensión

* Conectar a una **API real**: implementar `HttpBreedRepository`.
* Cambiar datos por entorno (desarrollo, test, producción): cambiar implementación inyectada.

---

## 🔪 Testing por Capa

| Capa            | Qué se testea                   | Herramientas             |
| --------------- | ------------------------------- | ------------------------ |
| Dominio         | Reglas de negocio, validaciones | Unit Test (Vitest)       |
| Aplicación      | Casos de uso                    | Unit Test (Vitest)       |
| Infraestructura | Acceso a datos y mocks          | Integration Test / Mock  |
| UI              | Comportamiento y renderizado    | Vitest + Testing Library |

---

## 📁 Estructura de Proyecto

```
src/
├── domain/
│   ├── entities/Breed.ts
│   └── repositories/IBreedRepository.ts
├── application/
│   └── use-cases/GetAllBreeds.ts
├── infrastructure/
│   └── repositories/FakeBreedRepository.ts
├── ui/
│   └── components/BreedSelect.vue
```

---

Si necesitas extender la lógica, crear nuevas entidades o exponer nuevos casos de uso, esta estructura asegura un sistema desacoplado y escalable.

