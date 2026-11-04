import { useQuery } from '@tanstack/react-query';

import { assessmentQuery, assessmentsQuery, sampleQuery } from '../api/queries';

export function useAssessments() {
  return useQuery(assessmentsQuery());
}

export function useAssessment(assessmentId: string) {
  return useQuery(assessmentQuery(assessmentId));
}

export function useSample(assessmentId: string, sampleId: string) {
  return useQuery(sampleQuery(assessmentId, sampleId));
}
