import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import { PageSkeleton } from '@/components/feedback/page-skeleton';
import { AppShell } from '@/components/layouts/app-shell';
import { paths } from '@/config/paths';

/** Each route module is its own chunk, loaded by the router on first navigation to it. */
export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    // Shown while the first route module loads.
    HydrateFallback: () => (
      <AppShell>
        <PageSkeleton />
      </AppShell>
    ),
    children: [
      { index: true, element: <Navigate to={paths.assessments.getHref()} replace /> },
      {
        path: paths.assessments.path,
        lazy: () =>
          import('./routes/assessments/assessments').then((m) => ({
            Component: m.AssessmentsRoute,
          })),
      },
      {
        path: paths.assessment.path,
        lazy: () =>
          import('./routes/assessments/assessment').then((m) => ({
            Component: m.AssessmentRoute,
          })),
      },
      {
        path: paths.sample.path,
        lazy: () =>
          import('./routes/assessments/sample').then((m) => ({ Component: m.SampleRoute })),
      },
      {
        path: '*',
        lazy: () => import('./routes/not-found').then((m) => ({ Component: m.NotFoundRoute })),
      },
    ],
  },
];

export const createAppRouter = () => createBrowserRouter(routes);
