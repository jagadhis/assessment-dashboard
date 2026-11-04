import { PageSkeleton } from '@/components/feedback/page-skeleton';
import { QueryError } from '@/components/feedback/query-error';
import { PageHeader } from '@/components/layouts/page-header';
import { paths } from '@/config/paths';
import { useAssessments } from '@/features/assessments/api/get-assessments';
import { AssessmentsTable } from '@/features/assessments/components/list/assessments-table';

export function AssessmentsRoute() {
  const { data: assessments, error, refetch } = useAssessments();

  if (error) {
    return <QueryError error={error} resource="Assessments" onRetry={() => void refetch()} />;
  }
  if (!assessments) return <PageSkeleton />;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: paths.home.getHref() }, { label: 'Assessments' }]}
        title="Assessments"
      />
      <AssessmentsTable assessments={assessments} />
    </>
  );
}
