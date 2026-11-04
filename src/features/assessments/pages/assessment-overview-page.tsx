import { useParams } from 'react-router';

import { PageSkeleton } from '@/components/feedback/page-skeleton';

import { DegradationChart } from '../components/overview/degradation-chart';
import { FindingsCard } from '../components/overview/findings-card';
import { FindingsDialog } from '../components/overview/findings-dialog';
import { KpiRow } from '../components/overview/kpi-row';
import { SamplesTable } from '../components/overview/samples-table';
import { useFindingsDialog } from '../hooks/use-findings-dialog';
import { AssessmentPageHeader } from '../components/shared/assessment-page-header';
import { QueryError } from '../components/shared/query-error';
import { useAssessment } from '../hooks/use-assessment';

export function AssessmentOverviewPage() {
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
