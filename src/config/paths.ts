/**
 * Every route path in one place. Route definitions use `path`; links use `getHref`,
 * so a URL change is a one-line edit here.
 */
export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },
  assessments: {
    path: '/assessments',
    getHref: () => '/assessments',
  },
  assessment: {
    path: '/assessments/:assessmentId',
    getHref: (assessmentId: string) => `/assessments/${encodeURIComponent(assessmentId)}`,
  },
  sample: {
    path: '/assessments/:assessmentId/samples/:sampleId',
    getHref: (assessmentId: string, sampleId: string) =>
      `/assessments/${encodeURIComponent(assessmentId)}/samples/${encodeURIComponent(sampleId)}`,
  },
} as const;
