import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';

import { sampleSchema, type Sample } from '@/features/assessments/types/schemas';
import { assessmentKeys, assessmentPath } from './query-keys';

export function getSample(assessmentId: string, sampleId: string): Promise<Sample> {
  return api.get(
    `${assessmentPath(assessmentId)}/samples/${encodeURIComponent(sampleId)}`,
    sampleSchema,
  );
}

export const getSampleQueryOptions = (assessmentId: string, sampleId: string) =>
  queryOptions({
    queryKey: assessmentKeys.sample(assessmentId, sampleId),
    queryFn: () => getSample(assessmentId, sampleId),
  });

export function useSample(assessmentId: string, sampleId: string) {
  return useQuery(getSampleQueryOptions(assessmentId, sampleId));
}
