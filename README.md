# Assessment Dashboard

A web dashboard for AI model robustness assessments. It shows how much a model's confidence drops when its inputs are perturbed, transformed, degraded or attacked, and lets you drill into each test sample and compare the reference input with every assessed variant.

Screens:

- **Assessments** (`/assessments`): every assessment, with its overall score.
- **Assessment overview** (`/assessments/:assessmentId`): overall score, four robustness metrics, degradation by category, summary and key findings, and the test samples. The findings and recommendations open in a dialog that is addressable by URL (`?view=findings`).
- **Sample detail** (`/assessments/:assessmentId/samples/:sampleId`): results per category, the assessed inputs of the selected category, and a side-by-side comparison of the reference input and the selected input. The selection is kept in the URL (`?category=…&input=…`).

The app ships with a mock API, so it runs without a backend. Two assessments are included: `product-name` has a score, and `product-name-unscored` shows the "N/A" state for model outputs that have no score.

## Stack

| Concern       | Choice                                                                                |
| ------------- | ------------------------------------------------------------------------------------- |
| Build         | Vite, React 19, TypeScript (strict, `noUncheckedIndexedAccess`)                       |
| Styling       | Tailwind CSS v4; design tokens live in the `@theme` block of `src/styles/index.css`   |
| UI components | shadcn/ui-style components on Radix primitives, in `src/components/ui`                |
| Icons         | lucide-react                                                                          |
| Fonts         | Source Serif 4 (headings, figures) and Inter (body), self-hosted via Fontsource       |
| Routing       | React Router, with each route module lazily loaded                                    |
| Data          | TanStack Query over a typed API layer, validated with Zod                             |
| Tests         | Vitest, Testing Library, jsdom                                                        |
| Quality       | ESLint (typescript-eslint strict, react-hooks, jsx-a11y, import boundaries), Prettier |

The "Degradation By Category" chart is plain HTML and CSS rather than a chart library. It has four bars, and a library such as Recharts would add tens of kilobytes of gzipped JavaScript for them. Screen readers get the same data as a visually hidden table.

## Getting started

Requires Node 26 (see `.nvmrc`) and pnpm.

```sh
pnpm install
pnpm dev
```

Then open http://localhost:5173.

## Scripts

| Script              | What it does                                   |
| ------------------- | ---------------------------------------------- |
| `pnpm dev`          | Start the dev server                           |
| `pnpm build`        | Type-check and build for production to `dist/` |
| `pnpm preview`      | Serve the production build locally             |
| `pnpm lint`         | Run ESLint; any warning fails                  |
| `pnpm typecheck`    | Run the TypeScript compiler                    |
| `pnpm format`       | Format all files with Prettier                 |
| `pnpm format:check` | Check formatting without writing               |
| `pnpm test`         | Run the test suite once                        |
| `pnpm test:watch`   | Run tests in watch mode                        |

CI (`.github/workflows/ci.yml`) runs install, lint, format check, typecheck, tests and build on every push to `main` and every pull request.

## Folder structure

The layout follows [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md). The rules for where code goes and what may import what are in [docs/conventions.md](docs/conventions.md).

```
public/samples/              Sample photos and their assessed variants (WebP)
docs/conventions.md          Where new code goes, naming, and the import rules
src/
  main.tsx                   Entry: turns on the mock API if configured, renders <App />
  app/
    app.tsx                  App component: providers and the router
    providers.tsx            React Query and tooltip providers
    router.tsx               Route table; every route module is lazy-loaded
    routes/                  Route modules: read params, handle loading/errors, compose features
      assessments/           assessments, assessment (overview), sample, and their tests
      not-found.tsx
  components/                Shared UI, no feature knowledge
    ui/                      shadcn-style primitives: Button, Card, Dialog, Select, Table, ...
    layouts/                 App shell, sidebar, top bar, page header, breadcrumbs
    feedback/                Page skeleton, error state, query error
  config/
    env.ts                   import.meta.env validated with Zod; picks mock or HTTP
    paths.ts                 Every route path, used by the router and by every link
  features/
    assessments/
      api/                   One module per request: fetcher, query options, hook
      components/            Feature components, grouped by screen: list/, overview/, sample/, shared/
      hooks/                 URL-backed UI state (findings dialog, sample selection)
      types/schemas.ts       Zod schemas and the domain types inferred from them
      utils/                 Category labels
  lib/
    api-client.ts            Request client: transport switch, Zod validation, ApiError
    query-client.ts          TanStack Query defaults
    format.ts                Percent, confidence and pp formatters
    utils.ts                 cn() with tailwind-merge configured for the theme tokens
  testing/
    setup-tests.ts           Vitest setup; installs the mock transport
    test-utils.tsx           renderRoute(): renders the real route tree at a URL
    mocks/                   Mock backend: fixtures, request handlers, mock transport
  utils/                     Small shared helpers (downloadBlob)
  styles/index.css           Tailwind entry and the @theme tokens (colours, type roles, spacing roles)
```

Shared folders with nothing in them yet (`hooks/`, `types/`, `assets/`) are left out until something needs them.

## Replacing the mock API with a real backend

All requests go through `src/lib/api-client.ts`. It sends each request through a transport and validates the JSON response against the request's Zod schema. By default the transport is `fetch`; when mocking is on, `src/main.tsx` swaps in the mock transport from `src/testing/mocks`, which answers from in-memory fixtures. The mock is loaded with a dynamic import, so a build pointed at a backend does not include it.

| Variable            | Effect                                                                                  |
| ------------------- | --------------------------------------------------------------------------------------- |
| `VITE_API_BASE_URL` | Base URL of the backend. Setting it turns mocking off unless `VITE_API_MOCKING` is set. |
| `VITE_API_MOCKING`  | `true` or `false`. Defaults to `true` when `VITE_API_BASE_URL` is not set.              |

Both are checked at start-up in `src/config/env.ts`; turning mocking off without a base URL fails with a clear error. The backend has to serve these endpoints, which the mock handlers also implement:

| Method and path                                    | Response                      |
| -------------------------------------------------- | ----------------------------- |
| `GET /assessments`                                 | `AssessmentListItem[]`        |
| `GET /assessments/:assessmentId`                   | `Assessment`                  |
| `GET /assessments/:assessmentId/samples/:sampleId` | `Sample`                      |
| `GET /assessments/:assessmentId/report`            | The report file (PDF or JSON) |

The schemas are in `src/features/assessments/types/schemas.ts`. A 404 shows a "not found" state; other errors show a retry button. If the backend has different routes or a different shape, change the request modules in `src/features/assessments/api/` (map the response onto the schemas there); if it needs authentication headers, add them in `src/lib/api-client.ts`.

Values follow these conventions:

- Confidence is a number from 0 to 1.
- Metric values and category degradation are percentages from 0 to 100.
- Changes (`resultChangePp`, `overallChangePp`, `changePp`) are signed percentage points. A negative value means confidence dropped.
- `overallScore` is `null` when the score does not apply to the model output; the UI then shows "N/A".
