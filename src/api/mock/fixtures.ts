import type { Assessment, AssessedInput, CategoryId, ImageAsset, Sample } from '../schemas';

type Photo = 'dog' | 'car';

const SUBJECT: Record<Photo, string> = { dog: 'Golden retriever', car: 'Black sedan' };
const REFERENCE_SIZE: Record<Photo, { width: number; height: number }> = {
  dog: { width: 960, height: 698 },
  car: { width: 960, height: 694 },
};
const VARIANT_SIZE: Record<Photo, { width: number; height: number }> = {
  dog: { width: 560, height: 407 },
  car: { width: 560, height: 405 },
};

function referenceImage(photo: Photo): ImageAsset {
  return {
    src: `/samples/${photo}/reference.webp`,
    ...REFERENCE_SIZE[photo],
    alt: `${SUBJECT[photo]}, reference input`,
  };
}

function thumbnailImage(photo: Photo): ImageAsset {
  return {
    src: `/samples/${photo}/thumb.webp`,
    ...VARIANT_SIZE[photo],
    alt: `${SUBJECT[photo]}, sample input`,
  };
}

interface VariantSpec {
  file: string;
  description: string;
}

const VARIANTS: Record<CategoryId, VariantSpec[]> = {
  'visual-perturbation': [
    { file: 'vp-1', description: 'pink colour tint' },
    { file: 'vp-2', description: 'converted to greyscale' },
    { file: 'vp-3', description: 'strong red colour cast' },
    { file: 'vp-4', description: 'warm, over-exposed tint' },
    { file: 'vp-5', description: 'cool blue colour tint' },
    { file: 'vp-6', description: 'boosted saturation and contrast' },
  ],
  'image-transformation': [
    { file: 'it-1', description: 'mirrored horizontally' },
    { file: 'it-2', description: 'rotated by 12 degrees' },
    { file: 'it-3', description: 'cropped and zoomed in' },
    { file: 'it-4', description: 'sheared perspective' },
  ],
  'adversarial-manipulation': [
    { file: 'am-1', description: 'adversarial colour noise' },
    { file: 'am-2', description: 'adversarial patch in the corner' },
    { file: 'am-3', description: 'edge-enhanced adversarial noise' },
  ],
  'image-quality-degradation': [
    { file: 'iq-1', description: 'Gaussian blur' },
    { file: 'iq-2', description: 'heavy JPEG compression' },
    { file: 'iq-3', description: 'under-exposed' },
    { file: 'iq-4', description: 'pixelated' },
  ],
};

const CATEGORY_ORDER: CategoryId[] = [
  'visual-perturbation',
  'image-transformation',
  'adversarial-manipulation',
  'image-quality-degradation',
];

/** Change in percentage points per variant, in the same order as VARIANTS. */
type ChangeTable = Record<CategoryId, number[]>;

const roundTo = (value: number, digits: number) => Number(value.toFixed(digits));

function buildInputs(
  sampleId: string,
  photo: Photo,
  referenceConfidence: number,
  changes: ChangeTable,
): AssessedInput[] {
  let counter = 0;
  return CATEGORY_ORDER.flatMap((categoryId) =>
    VARIANTS[categoryId].map((variant, index) => {
      counter += 1;
      const changePp = changes[categoryId][index] ?? 0;
      return {
        id: `${sampleId}-${variant.file}`,
        label: `V${counter}`,
        categoryId,
        image: {
          src: `/samples/${photo}/${variant.file}.webp`,
          ...VARIANT_SIZE[photo],
          alt: `${SUBJECT[photo]}, ${variant.description}`,
        },
        confidence: roundTo(referenceConfidence + changePp / 100, 3),
      };
    }),
  );
}

export type SampleFixture = Omit<Sample, 'categoryResults'>;

const DEGRADED_CHANGES: ChangeTable = {
  'visual-perturbation': [-18.3, -22.0, -25.1, -9.8, -15.4, -19.2],
  'image-transformation': [-10.2, -14.6, -12.1, -12.3],
  'adversarial-manipulation': [0, 0, 0],
  'image-quality-degradation': [3.1, 5.6, 5.5, 4.6],
};

const STABLE_CHANGES: ChangeTable = {
  'visual-perturbation': [-2.1, 1.4, 0, -0.8, 1.2, 0.3],
  'image-transformation': [0.4, -0.6, 0, 0.2],
  'adversarial-manipulation': [0, 0, 0],
  'image-quality-degradation': [1.1, -0.9, 0.5, -0.7],
};

interface SampleSpec {
  id: string;
  photo: Photo;
  referenceConfidence: number;
  overallChangePp: number;
  categoryId: CategoryId;
  changes: ChangeTable;
}

const SAMPLE_SPECS: SampleSpec[] = [
  {
    id: 's1',
    photo: 'dog',
    referenceConfidence: 0.942,
    overallChangePp: -18.3,
    categoryId: 'adversarial-manipulation',
    changes: DEGRADED_CHANGES,
  },
  {
    id: 's2',
    photo: 'car',
    referenceConfidence: 0.921,
    overallChangePp: 0,
    categoryId: 'visual-perturbation',
    changes: STABLE_CHANGES,
  },
  {
    id: 's3',
    photo: 'dog',
    referenceConfidence: 0.942,
    overallChangePp: -18.3,
    categoryId: 'adversarial-manipulation',
    changes: DEGRADED_CHANGES,
  },
];

const sampleLabel = (id: string) => id.toUpperCase();

function baseAssessment(id: string, productName: string): Omit<Assessment, 'overallScore'> {
  return {
    id,
    productName,
    modality: 'image',
    metrics: [
      {
        id: 'adc',
        abbreviation: 'ADC',
        name: 'Adversarial Confidence Degradation',
        valuePercent: 42.6,
        description:
          'Average drop in model confidence on adversarial inputs, relative to the reference output.',
      },
      {
        id: 'crs',
        abbreviation: 'CRS',
        name: 'Confidence Retention Score',
        valuePercent: 57.4,
        description:
          'Share of the reference confidence the model keeps across all assessed inputs. Higher is better.',
      },
      {
        id: 'mcd',
        abbreviation: 'MCD',
        name: 'Maximum Confidence Degradation',
        valuePercent: 78.2,
        description: 'Largest single drop in confidence seen on any assessed input.',
      },
      {
        id: 'cdv',
        abbreviation: 'CDV',
        name: 'Confidence Degradation Variability',
        valuePercent: 12.8,
        description:
          'How much the confidence drop varies between inputs. Lower means more predictable behaviour.',
      },
    ],
    degradationByCategory: [
      { categoryId: 'adversarial-manipulation', degradationPercent: 62.1 },
      { categoryId: 'visual-perturbation', degradationPercent: 42.4 },
      { categoryId: 'image-transformation', degradationPercent: 18.3 },
      { categoryId: 'image-quality-degradation', degradationPercent: 4.7 },
    ],
    summary:
      'The model shows changes in confidence under adversarial and transformation-based inputs, with the highest degradation observed for adversarial manipulation.',
    findings: [
      {
        id: 'f1',
        text: 'Adversarial manipulation recorded the highest confidence degradation at 62.1%.',
      },
      { id: 'f2', text: 'Visual perturbation resulted in 42.4% degradation.' },
      { id: 'f3', text: 'Image transformation showed 18.3% degradation.' },
      { id: 'f4', text: 'Image quality degradation had the lowest impact at 4.7%.' },
    ],
    recommendations: [
      {
        id: 'r1',
        text: 'Improve robustness against adversarial manipulation techniques',
        priority: 'high',
      },
      { id: 'r2', text: 'Enhance detection for transformation-based inputs', priority: 'medium' },
      {
        id: 'r3',
        text: 'Increase training data diversity for image variations',
        priority: 'medium',
      },
      { id: 'r4', text: 'Monitor emerging attack patterns on product assets', priority: 'low' },
    ],
    samples: SAMPLE_SPECS.map((spec) => ({
      id: spec.id,
      label: sampleLabel(spec.id),
      thumbnail: thumbnailImage(spec.photo),
      referenceConfidence: spec.referenceConfidence,
      resultChangePp: spec.overallChangePp,
      categoryId: spec.categoryId,
    })),
  };
}

export const assessments: Assessment[] = [
  {
    ...baseAssessment('product-name', 'Product Name'),
    overallScore: {
      value: 18,
      max: 100,
      summary: 'Model shows strong resilience with low attack success rate',
    },
  },
  { ...baseAssessment('product-name-unscored', 'Product Name (unscored)'), overallScore: null },
];

export const samples: SampleFixture[] = assessments.flatMap((assessment) =>
  SAMPLE_SPECS.map((spec) => ({
    id: spec.id,
    assessmentId: assessment.id,
    label: sampleLabel(spec.id),
    image: referenceImage(spec.photo),
    referenceConfidence: spec.referenceConfidence,
    overallChangePp: spec.overallChangePp,
    inputs: buildInputs(spec.id, spec.photo, spec.referenceConfidence, spec.changes),
  })),
);
