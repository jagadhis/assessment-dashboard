import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import { AppShell } from '@/components/layout/app-shell';

import {
  AssessmentOverviewPage,
  AssessmentsPage,
  NotFoundPage,
  SampleDetailPage,
} from './lazy-pages';

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/assessments" replace /> },
      { path: 'assessments', element: <AssessmentsPage /> },
      { path: 'assessments/:assessmentId', element: <AssessmentOverviewPage /> },
      { path: 'assessments/:assessmentId/samples/:sampleId', element: <SampleDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const createAppRouter = () => createBrowserRouter(routes);
