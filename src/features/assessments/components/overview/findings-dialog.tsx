import { useRef } from 'react';

import type { Assessment } from '@/api';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

import { FindingsList } from './findings-list';
import { RecommendationsTable } from './recommendations-table';

interface FindingsDialogProps {
  assessment: Pick<Assessment, 'summary' | 'findings' | 'recommendations'>;
  open: boolean;
  onClose: () => void;
}

export function FindingsDialog({ assessment, open, onClose }: FindingsDialogProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <DialogContent
        onOpenAutoFocus={(event) => {
          event.preventDefault();
          titleRef.current?.focus();
        }}
      >
        <DialogTitle ref={titleRef} tabIndex={-1} className="outline-none">
          Summary &amp; Key Findings
        </DialogTitle>
        <DialogDescription className="mt-4 text-foreground">{assessment.summary}</DialogDescription>
        <FindingsList findings={assessment.findings} className="mt-6" />

        <h3 className="mt-10 text-lg">Recommendations</h3>
        <p className="mt-1 mb-3 text-xs text-muted-foreground">
          Suggested actions to address findings and reduce risks.
        </p>
        <RecommendationsTable recommendations={assessment.recommendations} />
      </DialogContent>
    </Dialog>
  );
}
