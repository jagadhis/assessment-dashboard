import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link, type To } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Assessment } from '@/features/assessments/types/schemas';

import { FindingsList } from './findings-list';

interface FindingsCardProps {
  assessment: Pick<Assessment, 'summary' | 'findings'>;
  openTo: To;
}

export function FindingsCard({ assessment, openTo }: FindingsCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Summary &amp; Key Findings</CardTitle>
        <Link
          to={openTo}
          className="flex size-7 items-center justify-center rounded-md bg-muted text-muted-foreground transition-colors hover:text-foreground"
          aria-label="Expand summary and key findings"
        >
          <ArrowUpRight className="size-4" aria-hidden />
        </Link>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-6 pt-4">
        <p className="text-label leading-relaxed">{assessment.summary}</p>
        <FindingsList findings={assessment.findings} />
        <Link
          to={openTo}
          className="group mt-auto flex items-center gap-3 rounded-sm text-label text-brand-500"
        >
          <span
            className="flex size-6 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold"
            aria-hidden
          >
            !
          </span>
          <span className="group-hover:underline">View All Findings &amp; Recommendations</span>
          <ArrowRight className="ml-auto size-4" aria-hidden />
        </Link>
      </CardContent>
    </Card>
  );
}
