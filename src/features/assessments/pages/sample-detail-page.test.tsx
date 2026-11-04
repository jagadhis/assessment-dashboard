import { screen, within } from '@testing-library/react';

import { renderRoute } from '@/test/render-route';

const inputLabels = () =>
  within(screen.getByRole('list', { name: 'Assessed inputs' }))
    .getAllByRole('button')
    .map((button) => button.textContent);

const comparisonImage = async (label: string) => {
  const caption = await screen.findByText(`Selected Assessed Input (${label})`);
  const figure = caption.closest('figure');
  if (!figure) throw new Error('Comparison figure not found');
  return within(figure).getByRole('img');
};

describe('SampleDetailPage', () => {
  it('filters the assessed inputs by the selected category', async () => {
    const { user } = renderRoute('/assessments/product-name/samples/s1');

    const visual = await screen.findByRole('button', { name: /visual perturbation/i });
    expect(visual).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('Showing 4 of 6 inputs')).toBeInTheDocument();
    expect(inputLabels()).toEqual(['V1', 'V2', 'V3', 'V4']);

    const quality = screen.getByRole('button', { name: /image quality degradation/i });
    await user.click(quality);

    expect(quality).toHaveAttribute('aria-pressed', 'true');
    expect(visual).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByText('Showing 4 of 4 inputs')).toBeInTheDocument();
    expect(inputLabels()).toEqual(['V14', 'V15', 'V16', 'V17']);
  });

  it('updates the comparison when another input is selected', async () => {
    const { user } = renderRoute('/assessments/product-name/samples/s1');

    expect(await comparisonImage('V1')).toHaveAccessibleName(/pink colour tint/);
    expect(screen.getByRole('row', { name: /assessed input \(v1\)/i })).toHaveTextContent('0.759');

    const second = screen.getByRole('button', { name: /V2$/ });
    await user.click(second);

    expect(second).toHaveAttribute('aria-pressed', 'true');
    expect(await comparisonImage('V2')).toHaveAccessibleName(/greyscale/);
    expect(screen.getByRole('row', { name: /assessed input \(v2\)/i })).toHaveTextContent('0.722');
    expect(screen.getByRole('row', { name: /measured change/i })).toHaveTextContent('22.0 pp');
  });
});
