import { useSearchParams } from 'react-router';

import type { CategoryId, Sample } from '@/api';

/**
 * Category and input selection live in the URL so a specific comparison can be shared.
 * Missing or stale ids fall back to the first category and its first input.
 */
export function useSampleSelection(sample: Sample) {
  const [searchParams, setSearchParams] = useSearchParams();

  const category =
    sample.categoryResults.find((result) => result.categoryId === searchParams.get('category')) ??
    sample.categoryResults[0];
  const inputs = sample.inputs.filter((input) => input.categoryId === category?.categoryId);
  const input = inputs.find((candidate) => candidate.id === searchParams.get('input')) ?? inputs[0];

  return {
    category,
    inputs,
    input,
    selectCategory: (categoryId: CategoryId) => {
      setSearchParams({ category: categoryId }, { replace: true });
    },
    selectInput: (inputId: string) => {
      setSearchParams(
        (current) => {
          current.set('input', inputId);
          if (category) current.set('category', category.categoryId);
          return current;
        },
        { replace: true },
      );
    },
  };
}
