import type { CategoryId } from '@/features/assessments/types/schemas';

export const CATEGORY_LABELS: Record<CategoryId, string> = {
  'adversarial-manipulation': 'Adversarial Manipulation',
  'visual-perturbation': 'Visual Perturbation',
  'image-transformation': 'Image Transformation',
  'image-quality-degradation': 'Image Quality Degradation',
};
