import { useParams } from 'react-router';

import { PageSkeleton } from '@/components/feedback/page-skeleton';
import { QueryError } from '@/components/feedback/query-error';
import { useAssessment } from '@/features/assessments/api/get-assessment';
import { DegradationChart } from '@/features/assessments/components/overview/degradation-chart';
import { FindingsCard } from '@/features/assessments/components/overview/findings-card';
import { FindingsDialog } from '@/features/assessments/components/overview/findings-dialog';
import { KpiRow } from '@/features/assessments/components/overview/kpi-row';
import { SamplesTable } from '@/features/assessments/components/overview/samples-table';
import { AssessmentPageHeader } from '@/features/assessments/components/shared/assessment-page-header';
import { useFindingsDialog } from '@/features/assessments/hooks/use-findings-dialog';

export function AssessmentRoute() {
  const { assessmentId = '' } = useParams();
  const { data: assessment, error, refetch } = useAssessment(assessmentId);
  const findingsDialog = useFindingsDialog();

  if (error) {
    return <QueryError error={error} resource="Assessment" onRetry={() => void refetch()} />;
  }
  if (!assessment) return <PageSkeleton />;

  return (
    <>
      <AssessmentPageHeader assessment={assessment} />
      <div className="flex flex-col gap-5">
        <KpiRow assessment={assessment} />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <DegradationChart data={assessment.degradationByCategory} />
          <FindingsCard assessment={assessment} openTo={findingsDialog.openTo} />
        </div>
        <SamplesTable assessmentId={assessment.id} samples={assessment.samples} />
      </div>
      <FindingsDialog
        assessment={assessment}
        open={findingsDialog.isOpen}
        onClose={findingsDialog.close}
      />
    </>
  );
}
