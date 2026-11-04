export const assessmentKeys = {
  all: ['assessments'] as const,
  detail: (assessmentId: string) => [...assessmentKeys.all, assessmentId] as const,
  sample: (assessmentId: string, sampleId: string) =>
    [...assessmentKeys.detail(assessmentId), 'samples', sampleId] as const,
};

export const assessmentPath = (assessmentId: string) =>
  `/assessments/${encodeURIComponent(assessmentId)}`;
