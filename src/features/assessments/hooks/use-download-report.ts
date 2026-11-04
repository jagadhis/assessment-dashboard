import { useMutation } from '@tanstack/react-query';

import { api } from '@/api';

function saveBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function useDownloadReport(assessmentId: string) {
  return useMutation({
    mutationFn: () => api.downloadReport(assessmentId),
    onSuccess: (blob) => {
      const extension = blob.type === 'application/pdf' ? 'pdf' : 'json';
      saveBlob(blob, `${assessmentId}-report.${extension}`);
    },
  });
}
