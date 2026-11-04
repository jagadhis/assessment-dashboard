import type {
  AssessedInput,
  Assessment,
  AssessmentListItem,
  CategoryId,
  CategoryResult,
  Sample,
} from '@/features/assessments/types/schemas';

import { assessments, samples, type SampleFixture } from './fixtures';

/** Categories where the worst single input matters more than the average. */
const MAXIMUM_AGGREGATED: ReadonlySet<CategoryId> = new Set(['adversarial-manipulation']);

const round1 = (value: number) => Math.round(value * 10) / 10;

function categoryResults(sample: SampleFixture): CategoryResult[] {
  const byCategory = new Map<CategoryId, AssessedInput[]>();
  for (const input of sample.inputs) {
    byCategory.set(input.categoryId, [...(byCategory.get(input.categoryId) ?? []), input]);
  }

  return [...byCategory].map(([categoryId, inputs]) => {
    const changes = inputs.map((input) => (input.confidence - sample.referenceConfidence) * 100);
    const aggregation = MAXIMUM_AGGREGATED.has(categoryId) ? 'maximum' : 'average';
    const changePp =
      aggregation === 'maximum'
        ? Math.min(0, ...changes)
        : changes.reduce((sum, change) => sum + change, 0) / changes.length;
    return {
      categoryId,
      variantCount: inputs.length,
      aggregation,
      changePp: round1(changePp),
      baselineConfidence: sample.referenceConfidence,
    };
  });
}

const findAssessment = (id: string) => assessments.find((assessment) => assessment.id === id);

type Params = Record<string, string>;

interface Handler {
  /** A path with `:name` segments, matched against the request path. */
  path: string;
  /** Returns the response body, or undefined for a 404. */
  resolve: (params: Params) => unknown;
}

/** The mock backend: the same endpoints the HTTP backend serves (see the README). */
export const handlers: Handler[] = [
  {
    path: '/assessments',
    resolve: (): AssessmentListItem[] =>
      assessments.map(({ id, productName, modality, overallScore }) => ({
        id,
        productName,
        modality,
        overallScore,
      })),
  },
  {
    path: '/assessments/:assessmentId',
    resolve: ({ assessmentId = '' }): Assessment | undefined => findAssessment(assessmentId),
  },
  {
    path: '/assessments/:assessmentId/samples/:sampleId',
    resolve: ({ assessmentId, sampleId }): Sample | undefined => {
      const sample = samples.find((s) => s.assessmentId === assessmentId && s.id === sampleId);
      return sample && { ...sample, categoryResults: categoryResults(sample) };
    },
  },
  {
    path: '/assessments/:assessmentId/report',
    resolve: ({ assessmentId = '' }) => {
      const assessment = findAssessment(assessmentId);
      return (
        assessment && new Blob([JSON.stringify(assessment, null, 2)], { type: 'application/json' })
      );
    },
  },
];

export function matchPath(pattern: string, path: string): Params | undefined {
  const expected = pattern.split('/');
  const actual = path.split('/');
  if (expected.length !== actual.length) return undefined;

  const params: Params = {};
  for (const [index, segment] of expected.entries()) {
    const value = actual[index] ?? '';
    if (segment.startsWith(':')) params[segment.slice(1)] = decodeURIComponent(value);
    else if (segment !== value) return undefined;
  }
  return params;
}
