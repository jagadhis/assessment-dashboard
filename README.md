# Assessment Dashboard

A web dashboard for AI model robustness assessments. It shows how much a model's confidence drops when its inputs are perturbed, transformed, degraded or attacked, and lets you drill into each test sample and compare the reference input with every assessed variant.

Screens:

- **Assessments** (`/assessments`): every assessment, with its overall score.
- **Assessment overview** (`/assessments/:assessmentId`): overall score, four robustness metrics, degradation by category, summary and key findings, and the test samples. The findings and recommendations open in a dialog that is addressable by URL (`?view=findings`).
- **Sample detail** (`/assessments/:assessmentId/samples/:sampleId`): results per category, the assessed inputs of the selected category, and a side-by-side comparison of the reference input and the selected input. The selection is kept in the URL (`?category=…&input=…`).

The app ships with a mock API, so it runs without a backend. Two assessments are included: `product-name` has a score, and `product-name-unscored` shows the "N/A" state for model outputs that have no score.

## Stack

| Concern       | Choice                                                                              |
| ------------- | ----------------------------------------------------------------------------------- |
| Build         | Vite, React 19, TypeScript (strict, `noUncheckedIndexedAccess`)                     |
| Styling       | Tailwind CSS v4; design tokens live in the `@theme` block of `src/styles/index.css` |
| UI components | shadcn/ui-style components on Radix primitives, in `src/components/ui`              |
| Icons         | lucide-react                                                                        |
| Fonts         | Source Serif 4 (headings, figures) and Inter (body), self-hosted via Fontsource     |
| Routing       | React Router, with each page lazily loaded                                          |
| Data          | TanStack Query over a typed API layer, validated with Zod                           |
| Tests         | Vitest, Testing Library, jsdom                                                      |
| Quality       | ESLint (typescript-eslint strict, react-hooks, jsx-a11y), Prettier                  |

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

```
public/samples/            Sample photos and their assessed variants (WebP)
src/
  api/                     The only code that knows where data comes from
    client.ts              AssessmentApi interface the UI depends on
    schemas.ts             Zod schemas and inferred domain types
    http-api.ts            fetch-based implementation for a real backend
    mock/                  In-memory implementation and fixtures
    index.ts               Picks the implementation and exports `api`
  app/                     Router, lazy page imports, providers, query client
  components/
    layout/                App shell, sidebar, top bar, breadcrumbs, page header
    feedback/              Loading skeleton and error state
    ui/                    Button, Card, Dialog, Select, Table, Tooltip, Badge, Skeleton
  features/assessments/
    api/                   TanStack Query keys and query options
    hooks/                 Data hooks and URL-backed UI state
    components/overview/   Overview page building blocks
    components/sample/     Sample detail building blocks
    components/shared/     Pieces used by both pages
    lib/                   Category labels
    pages/                 Route components and their tests
  lib/                     Formatters (percent, confidence, pp change) and `cn`
  pages/                   404 page
  styles/index.css         Tailwind entry and design tokens
  test/                    Test setup and a helper that renders a route
```

## Replacing the mock API with a real backend

All data access goes through the `AssessmentApi` interface in `src/api/client.ts`. Components and hooks never import the mock directly, so switching to a real backend only touches `src/api/`.

**Option 1: use the bundled HTTP client.** Set `VITE_API_BASE_URL` (for example in `.env.local`) and the app uses `src/api/http-api.ts` instead of the mock. It expects these endpoints:

| Method and path                                    | Response                      |
| -------------------------------------------------- | ----------------------------- |
| `GET /assessments`                                 | `AssessmentListItem[]`        |
| `GET /assessments/:assessmentId`                   | `Assessment`                  |
| `GET /assessments/:assessmentId/samples/:sampleId` | `Sample`                      |
| `GET /assessments/:assessmentId/report`            | The report file (PDF or JSON) |

Every JSON response is validated against the Zod schemas in `src/api/schemas.ts`. A 404 shows a "not found" state; other errors show a retry button.

**Option 2: write your own implementation.** If the backend has different routes, needs authentication headers, or returns a different shape, write a new implementation of `AssessmentApi` (map the backend's response onto the schemas there) and return it from `src/api/index.ts`.

Values follow these conventions:

- Confidence is a number from 0 to 1.
- Metric values and category degradation are percentages from 0 to 100.
- Changes (`resultChangePp`, `overallChangePp`, `changePp`) are signed percentage points. A negative value means confidence dropped.
- `overallScore` is `null` when the score does not apply to the model output; the UI then shows "N/A".
