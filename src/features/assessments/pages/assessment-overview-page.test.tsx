import { screen, within } from '@testing-library/react';

import { renderRoute } from '@/testing/test-utils';

describe('AssessmentOverviewPage', () => {
  it('shows the overall score when the assessment has one', async () => {
    renderRoute('/assessments/product-name');

    const scoreCard = (await screen.findByRole('heading', { name: 'Overall Score' })).parentElement
      ?.parentElement;
    expect(scoreCard).toHaveTextContent('18/ 100');
    expect(scoreCard).toHaveTextContent('Model shows strong resilience');
  });

  it('shows the not-applicable state when the score is missing', async () => {
    renderRoute('/assessments/product-name-unscored');

    expect(await screen.findByText('Not applicable for this model output.')).toBeInTheDocument();
    expect(screen.getByText('Not applicable')).toBeInTheDocument();
    expect(screen.queryByText('/ 100')).not.toBeInTheDocument();
  });

  it('opens the findings dialog with recommendations and closes it with Escape', async () => {
    const { router, user } = renderRoute('/assessments/product-name');

    await user.click(
      await screen.findByRole('link', { name: /view all findings & recommendations/i }),
    );

    const dialog = await screen.findByRole('dialog', { name: 'Summary & Key Findings' });
    expect(router.state.location.search).toBe('?view=findings');
    const rows = within(dialog).getAllByRole('row');
    expect(rows[1]).toHaveTextContent('Improve robustness against adversarial manipulation');
    expect(rows[1]).toHaveTextContent('High');

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(router.state.location.search).toBe('');
  });

  it('shows a not-found state for an unknown assessment', async () => {
    renderRoute('/assessments/does-not-exist');

    expect(
      await screen.findByRole('heading', { name: 'Assessment not found' }),
    ).toBeInTheDocument();
  });
});
