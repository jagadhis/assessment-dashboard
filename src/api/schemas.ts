import { z } from 'zod';

export const modalitySchema = z.enum(['image', 'text', 'audio']);

export const categoryIdSchema = z.enum([
  'adversarial-manipulation',
  'visual-perturbation',
  'image-transformation',
  'image-quality-degradation',
]);

export const prioritySchema = z.enum(['high', 'medium', 'low']);

const confidenceSchema = z.number().min(0).max(1);
const percentSchema = z.number().min(0).max(100);

export const imageAssetSchema = z.object({
  src: z.string().min(1),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
  alt: z.string().min(1),
});

export const overallScoreSchema = z.object({
  value: z.number().min(0).max(100),
  max: z.literal(100),
  summary: z.string(),
});

export const metricSchema = z.object({
  id: z.string(),
  abbreviation: z.string(),
  name: z.string(),
  valuePercent: percentSchema,
  description: z.string(),
});

export const categoryDegradationSchema = z.object({
  categoryId: categoryIdSchema,
  degradationPercent: percentSchema,
});

export const findingSchema = z.object({
  id: z.string(),
  text: z.string(),
});

export const recommendationSchema = z.object({
  id: z.string(),
  text: z.string(),
  priority: prioritySchema,
});

export const sampleSummarySchema = z.object({
  id: z.string(),
  label: z.string(),
  thumbnail: imageAssetSchema,
  referenceConfidence: confidenceSchema,
  /** Signed change in percentage points; negative means confidence dropped. */
  resultChangePp: z.number(),
  categoryId: categoryIdSchema,
});

export const assessmentSchema = z.object({
  id: z.string(),
  productName: z.string(),
  modality: modalitySchema,
  /** Null when the model output has no score the assessment can compute. */
  overallScore: overallScoreSchema.nullable(),
  metrics: z.array(metricSchema),
  degradationByCategory: z.array(categoryDegradationSchema),
  summary: z.string(),
  findings: z.array(findingSchema),
  recommendations: z.array(recommendationSchema),
  samples: z.array(sampleSummarySchema),
});

export const assessmentListItemSchema = assessmentSchema.pick({
  id: true,
  productName: true,
  modality: true,
  overallScore: true,
});

export const assessedInputSchema = z.object({
  id: z.string(),
  label: z.string(),
  categoryId: categoryIdSchema,
  image: imageAssetSchema,
  confidence: confidenceSchema,
});

export const categoryResultSchema = z.object({
  categoryId: categoryIdSchema,
  variantCount: z.number().int().nonnegative(),
  aggregation: z.enum(['average', 'maximum']),
  changePp: z.number(),
  baselineConfidence: confidenceSchema,
});

export const sampleSchema = z.object({
  id: z.string(),
  assessmentId: z.string(),
  label: z.string(),
  image: imageAssetSchema,
  referenceConfidence: confidenceSchema,
  overallChangePp: z.number(),
  categoryResults: z.array(categoryResultSchema),
  inputs: z.array(assessedInputSchema),
});

export type Modality = z.infer<typeof modalitySchema>;
export type CategoryId = z.infer<typeof categoryIdSchema>;
export type Priority = z.infer<typeof prioritySchema>;
export type ImageAsset = z.infer<typeof imageAssetSchema>;
export type OverallScore = z.infer<typeof overallScoreSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type CategoryDegradation = z.infer<typeof categoryDegradationSchema>;
export type Finding = z.infer<typeof findingSchema>;
export type Recommendation = z.infer<typeof recommendationSchema>;
export type SampleSummary = z.infer<typeof sampleSummarySchema>;
export type Assessment = z.infer<typeof assessmentSchema>;
export type AssessmentListItem = z.infer<typeof assessmentListItemSchema>;
export type AssessedInput = z.infer<typeof assessedInputSchema>;
export type CategoryResult = z.infer<typeof categoryResultSchema>;
export type Sample = z.infer<typeof sampleSchema>;
