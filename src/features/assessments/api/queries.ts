import { queryOptions } from '@tanstack/react-query';

import { api } from '@/api';

export const assessmentKeys = {
  all: ['assessments'] as const,
  detail: (assessmentId: string) => [...assessmentKeys.all, assessmentId] as const,
  sample: (assessmentId: string, sampleId: string) =>
    [...assessmentKeys.detail(assessmentId), 'samples', sampleId] as const,
};

export const assessmentsQuery = () =>
  queryOptions({ queryKey: assessmentKeys.all, queryFn: () => api.listAssessments() });

export const assessmentQuery = (assessmentId: string) =>
  queryOptions({
    queryKey: assessmentKeys.detail(assessmentId),
    queryFn: () => api.getAssessment(assessmentId),
  });

export const sampleQuery = (assessmentId: string, sampleId: string) =>
  queryOptions({
    queryKey: assessmentKeys.sample(assessmentId, sampleId),
    queryFn: () => api.getSample(assessmentId, sampleId),
  });
