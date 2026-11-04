# Conventions

## Where new code goes

| You are adding                                         | Put it in                                                |
| ------------------------------------------------------ | -------------------------------------------------------- |
| A page                                                 | `src/app/routes/`, then add it to `src/app/router.tsx`   |
| A URL                                                  | `src/config/paths.ts`, and link with `paths.x.getHref()` |
| A request to the backend                               | `src/features/<feature>/api/<verb>-<thing>.ts`           |
| A component used by one feature                        | `src/features/<feature>/components/<screen>/`            |
| A component with no feature knowledge                  | `src/components/` (`ui/`, `layouts/` or `feedback/`)     |
| A domain type or schema                                | `src/features/<feature>/types/`                          |
| A preconfigured library (API client, query client, cn) | `src/lib/`                                               |
| A small helper used across features                    | `src/utils/`                                             |
| An environment variable                                | `src/config/env.ts` (and `src/vite-env.d.ts`)            |
| Mock data or a mock endpoint                           | `src/testing/mocks/`                                     |

Route modules stay thin: read params, handle the loading and error states, and compose feature components. Feature logic lives in the feature.

A request module holds three things for one request, following bulletproof-react:

```ts
export function getSample(assessmentId, sampleId) { … }          // the fetcher
export const getSampleQueryOptions = (assessmentId, sampleId) => // key + fetcher
  queryOptions({ … });
export function useSample(assessmentId, sampleId) { … }          // the hook components use
```

## Import rules

Imports flow one way: **shared → features → app**. ESLint enforces it (`import-x/no-restricted-paths` in `eslint.config.js`):

- `src/app` may import anything.
- A feature may import shared code and its own files. It may not import another feature or `src/app`. If two features need to work together, compose them in a route.
- Shared code (`components`, `config`, `hooks`, `lib`, `types`, `utils`) may not import features or `src/app`.
- Only tests and `src/main.tsx` may import `src/testing`.

Inside `src`, import from another folder with the `@/` alias (`@/features/assessments/types/schemas`). `./` is fine for a file in the same folder; `../` is a lint error.

There is no barrel file per folder. Import the module you need directly, which keeps lazy route chunks small.

## Naming

- Files and folders are kebab-case (`sample-header-card.tsx`); ESLint checks it.
- Named exports only; `src` has no default exports.
- Components are PascalCase, hooks start with `use`, request fetchers start with `get`.

## Styling

- Colours, radii, shadows, type roles and spacing roles are tokens in the `@theme` block of `src/styles/index.css`.
- Use the type roles for text: `text-page-title`, `text-card-title`, `text-card-subtitle`, `text-label`, `text-caption`, `text-stat`, `text-kpi`. Headings get the serif face from the base layer; add `font-serif` to a figure.
- Use the spacing roles for layout: `gap-section` between sections and between cards in a grid, `p-card` (or `Card`'s header and content) inside a card, `px-gutter` for the page edge.
- Every panel is a `Card` from `src/components/ui/card.tsx`.
- When you add a token, add it to `extendTailwindMerge` in `src/lib/utils.ts` too, or `cn()` may drop it.

## Tests

Tests sit next to the code they test (`format.test.ts` next to `format.ts`, route tests next to the route module). Shared test helpers live in `src/testing`. Route tests render the real route tree with `renderRoute()` against the mock transport, which runs with no delay in tests.
