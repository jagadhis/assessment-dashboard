import type { Assessment } from '@/features/assessments/types/schemas';
import type { Crumb } from '@/components/layout/breadcrumbs';
import { PageHeader } from '@/components/layout/page-header';

import { DownloadReportButton } from './download-report-button';
import { ModalitySelect } from './modality-select';
import { paths } from '@/config/paths';

interface AssessmentPageHeaderProps {
  assessment: Pick<Assessment, 'id' | 'productName' | 'modality'>;
  trailingCrumb?: string;
}

export function AssessmentPageHeader({ assessment, trailingCrumb }: AssessmentPageHeaderProps) {
  const overviewPath = paths.assessment.getHref(assessment.id);
  const breadcrumbs: Crumb[] = [
    { label: 'Home', to: paths.home.getHref() },
    { label: 'Assessments', to: paths.assessments.getHref() },
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
