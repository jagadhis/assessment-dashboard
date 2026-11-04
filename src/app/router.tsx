import { createBrowserRouter, Navigate, type RouteObject } from 'react-router';

import { AppShell } from '@/components/layout/app-shell';

import {
  AssessmentOverviewPage,
  AssessmentsPage,
  NotFoundPage,
  SampleDetailPage,
} from './lazy-pages';
import { paths } from '@/config/paths';

export const routes: RouteObject[] = [
  {
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to={paths.assessments.getHref()} replace /> },
      { path: paths.assessments.path, element: <AssessmentsPage /> },
      { path: paths.assessment.path, element: <AssessmentOverviewPage /> },
      { path: paths.sample.path, element: <SampleDetailPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export const createAppRouter = () => createBrowserRouter(routes);
