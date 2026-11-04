import { useMutation } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { downloadBlob } from '@/utils/download-blob';

import { assessmentPath } from './query-keys';

/** The report file, PDF or JSON depending on the backend. */
export function getReport(assessmentId: string): Promise<Blob> {
  return api.getBlob(`${assessmentPath(assessmentId)}/report`);
}

export function useDownloadReport(assessmentId: string) {
  return useMutation({
    mutationFn: () => getReport(assessmentId),
    onSuccess: (blob) => {
      const extension = blob.type === 'application/pdf' ? 'pdf' : 'json';
      downloadBlob(blob, `${assessmentId}-report.${extension}`);
    },
  });
}
