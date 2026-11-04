import { Download, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { useDownloadReport } from '@/features/assessments/api/download-report';

export function DownloadReportButton({ assessmentId }: { assessmentId: string }) {
  const download = useDownloadReport(assessmentId);

  return (
    <div className="flex items-center gap-3">
      {download.isError && (
        <p role="alert" className="text-xs text-decrease">
          Download failed. Try again.
        </p>
      )}
      <Button
        onClick={() => {
          download.mutate();
        }}
        disabled={download.isPending}
        className="min-w-44"
      >
        {download.isPending ? (
          <LoaderCircle className="animate-spin" aria-hidden />
        ) : (
          <Download aria-hidden />
        )}
        {download.isPending ? 'Preparing report…' : 'Download Report'}
      </Button>
    </div>
  );
}
