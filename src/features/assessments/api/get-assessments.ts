import { queryOptions, useQuery } from '@tanstack/react-query';

import {
  assessmentListItemSchema,
  type AssessmentListItem,
} from '@/features/assessments/types/schemas';
import { api } from '@/lib/api-client';

import { assessmentKeys } from './query-keys';

export function getAssessments(): Promise<AssessmentListItem[]> {
  return api.get('/assessments', assessmentListItemSchema.array());
}

export const getAssessmentsQueryOptions = () =>
  queryOptions({ queryKey: assessmentKeys.all, queryFn: getAssessments });

export function useAssessments() {
  return useQuery(getAssessmentsQueryOptions());
}
