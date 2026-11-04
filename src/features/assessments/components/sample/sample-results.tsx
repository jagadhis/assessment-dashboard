import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoTooltip } from '@/features/assessments/components/shared/info-tooltip';
import { useSampleSelection } from '@/features/assessments/hooks/use-sample-selection';
import type { Sample } from '@/features/assessments/types/schemas';

import { AssessedInputsGrid } from './assessed-inputs-grid';
import { CategoryResultCards } from './category-result-cards';
import { SelectedInputDetails } from './selected-input-details';

const CATEGORY_HELP =
  'Each category groups inputs produced by one family of changes. Select a category to see its inputs.';

/** The category filter, its inputs, and the comparison of the selected input. */
export function SampleResults({ sample }: { sample: Sample }) {
  const selection = useSampleSelection(sample);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Assessment Results (By Category)</CardTitle>
            <InfoTooltip label="assessment results by category" content={CATEGORY_HELP} />
          </div>
          <CardDescription>
            Summary of results for this sample across different assessment categories
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8 pt-5">
          <CategoryResultCards
            results={sample.categoryResults}
            selectedId={selection.category?.categoryId}
            onSelect={selection.selectCategory}
          />
          <hr className="mx-auto w-1/3 border-border" />
          <AssessedInputsGrid
            key={selection.category?.categoryId}
            inputs={selection.inputs}
            selectedId={selection.input?.id}
            onSelect={selection.selectInput}
          />
        </CardContent>
      </Card>
      {selection.input && (
        <SelectedInputDetails
          reference={{ image: sample.image, confidence: sample.referenceConfidence }}
          input={selection.input}
        />
      )}
    </>
  );
}
