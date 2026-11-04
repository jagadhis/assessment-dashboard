import { getSample } from '@/features/assessments/api/get-sample';
import { isNotFound } from '@/lib/api-client';

describe('mock handlers', () => {
  it('aggregates each category from its assessed inputs', async () => {
    const sample = await getSample('product-name', 's1');

    expect(sample.inputs).toHaveLength(17);
    expect(
      sample.categoryResults.map(({ categoryId, variantCount, aggregation, changePp }) => ({
        categoryId,
        variantCount,
        aggregation,
        changePp,
      })),
    ).toEqual([
      {
        categoryId: 'visual-perturbation',
        variantCount: 6,
        aggregation: 'average',
        changePp: -18.3,
      },
      {
        categoryId: 'image-transformation',
        variantCount: 4,
        aggregation: 'average',
        changePp: -12.3,
      },
      {
        categoryId: 'adversarial-manipulation',
        variantCount: 3,
        aggregation: 'maximum',
        changePp: 0,
      },
      {
        categoryId: 'image-quality-degradation',
        variantCount: 4,
        aggregation: 'average',
        changePp: 4.7,
      },
    ]);
  });

  it('rejects unknown ids with a not-found error', async () => {
    const error: unknown = await getSample('product-name', 'missing').catch((e: unknown) => e);
    expect(isNotFound(error)).toBe(true);
  });
});
