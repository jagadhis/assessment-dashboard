import type { Assessment } from '@/api';
import type { Crumb } from '@/components/layout/breadcrumbs';
import { PageHeader } from '@/components/layout/page-header';

import { DownloadReportButton } from './download-report-button';
import { ModalitySelect } from './modality-select';

interface AssessmentPageHeaderProps {
  assessment: Pick<Assessment, 'id' | 'productName' | 'modality'>;
  trailingCrumb?: string;
}

export function AssessmentPageHeader({ assessment, trailingCrumb }: AssessmentPageHeaderProps) {
  const overviewPath = `/assessments/${assessment.id}`;
  const breadcrumbs: Crumb[] = [
    { label: 'Home', to: '/' },
    { label: 'Assessments', to: '/assessments' },
    trailingCrumb
      ? { label: assessment.productName, to: overviewPath }
      : { label: assessment.productName },
    ...(trailingCrumb ? [{ label: trailingCrumb }] : []),
  ];

  return (
    <PageHeader
      breadcrumbs={breadcrumbs}
      title={`Assessment Overview - ${assessment.productName}`}
      actions={
        <>
          <ModalitySelect modality={assessment.modality} />
          <DownloadReportButton assessmentId={assessment.id} />
        </>
      }
    />
  );
}
