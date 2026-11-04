import type { AssessmentApi } from '../client';
import { ApiError } from '../errors';
import {
  assessmentListItemSchema,
  assessmentSchema,
  sampleSchema,
  type AssessedInput,
  type CategoryId,
  type CategoryResult,
} from '../schemas';
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

function notFound(what: string): never {
  throw new ApiError(`${what} not found`, 404);
}

interface MockApiOptions {
  delayMs: number;
}

export function createMockApi({ delayMs }: MockApiOptions): AssessmentApi {
  const respond = async <T>(produce: () => T): Promise<T> => {
    if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));
    return produce();
  };

  const findAssessment = (id: string) =>
    assessments.find((assessment) => assessment.id === id) ?? notFound('Assessment');

  return {
    listAssessments: () => respond(() => assessmentListItemSchema.array().parse(assessments)),

    getAssessment: (id) => respond(() => assessmentSchema.parse(findAssessment(id))),

    getSample: (assessmentId, sampleId) =>
      respond(() => {
        const sample =
          samples.find((s) => s.assessmentId === assessmentId && s.id === sampleId) ??
          notFound('Sample');
        return sampleSchema.parse({ ...sample, categoryResults: categoryResults(sample) });
      }),

    downloadReport: (id) =>
      respond(
        () => new Blob([JSON.stringify(findAssessment(id), null, 2)], { type: 'application/json' }),
      ),
  };
}
