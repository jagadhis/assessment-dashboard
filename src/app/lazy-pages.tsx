import { lazy } from 'react';

export const AssessmentsPage = lazy(() =>
  import('@/features/assessments/pages/assessments-page').then((m) => ({
    default: m.AssessmentsPage,
  })),
);
export const AssessmentOverviewPage = lazy(() =>
  import('@/features/assessments/pages/assessment-overview-page').then((m) => ({
    default: m.AssessmentOverviewPage,
  })),
);
export const SampleDetailPage = lazy(() =>
  import('@/features/assessments/pages/sample-detail-page').then((m) => ({
    default: m.SampleDetailPage,
  })),
);
export const NotFoundPage = lazy(() =>
  import('@/pages/not-found-page').then((m) => ({ default: m.NotFoundPage })),
);
