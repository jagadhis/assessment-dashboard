import { useParams } from 'react-router';

import { PageSkeleton } from '@/components/feedback/page-skeleton';
import { QueryError } from '@/components/feedback/query-error';
import { useAssessment } from '@/features/assessments/api/get-assessment';
import { useSample } from '@/features/assessments/api/get-sample';
import { SampleHeaderCard } from '@/features/assessments/components/sample/sample-header-card';
import { SampleResults } from '@/features/assessments/components/sample/sample-results';
import { AssessmentPageHeader } from '@/features/assessments/components/shared/assessment-page-header';

export function SampleRoute() {
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
