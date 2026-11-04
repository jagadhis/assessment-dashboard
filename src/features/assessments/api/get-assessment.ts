import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

import { assessmentSchema, type Assessment } from '@/features/assessments/types/schemas';
import { assessmentKeys, assessmentPath } from './query-keys';

export function getAssessment(assessmentId: string): Promise<Assessment> {
  return api.get(assessmentPath(assessmentId), assessmentSchema);
}

export const getAssessmentQueryOptions = (assessmentId: string) =>
  queryOptions({
    queryKey: assessmentKeys.detail(assessmentId),
    queryFn: () => getAssessment(assessmentId),
  });

export function useAssessment(assessmentId: string) {
  return useQuery(getAssessmentQueryOptions(assessmentId));
}
