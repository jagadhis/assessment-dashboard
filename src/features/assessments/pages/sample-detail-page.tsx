import { useParams } from 'react-router';

import type { Sample } from '@/api';
import { PageSkeleton } from '@/components/feedback/page-skeleton';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { AssessedInputsGrid } from '../components/sample/assessed-inputs-grid';
import { CategoryResultCards } from '../components/sample/category-result-cards';
import { SampleHeaderCard } from '../components/sample/sample-header-card';
import { SelectedInputDetails } from '../components/sample/selected-input-details';
import { AssessmentPageHeader } from '../components/shared/assessment-page-header';
import { InfoTooltip } from '../components/shared/info-tooltip';
import { QueryError } from '../components/shared/query-error';
import { useAssessment, useSample } from '../hooks/use-assessment';
import { useSampleSelection } from '../hooks/use-sample-selection';

const CATEGORY_HELP =
  'Each category groups inputs produced by one family of changes. Select a category to see its inputs.';

function SampleResults({ sample }: { sample: Sample }) {
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

export function SampleDetailPage() {
  const { assessmentId = '', sampleId = '' } = useParams();
  const assessment = useAssessment(assessmentId);
  const sample = useSample(assessmentId, sampleId);

  const failed = assessment.error ?? sample.error;
  if (failed) {
    return (
      <QueryError
        error={failed}
        resource={assessment.error ? 'Assessment' : 'Sample'}
        onRetry={() => {
          void assessment.refetch();
          void sample.refetch();
        }}
      />
    );
  }
  if (!assessment.data || !sample.data) return <PageSkeleton />;

  return (
    <>
      <AssessmentPageHeader assessment={assessment.data} trailingCrumb={sample.data.label} />
      <div className="flex flex-col gap-5">
        <SampleHeaderCard sample={sample.data} />
        <SampleResults sample={sample.data} />
      </div>
    </>
  );
}
