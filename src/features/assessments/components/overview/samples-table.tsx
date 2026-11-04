import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { paths } from '@/config/paths';
import { ChangeIndicator } from '@/features/assessments/components/shared/change-indicator';
import type { SampleSummary } from '@/features/assessments/types/schemas';
import { CATEGORY_LABELS } from '@/features/assessments/utils/categories';
import { changeDirection, formatConfidence } from '@/lib/format';

import { SampleThumbnail } from './sample-thumbnail';

interface SamplesTableProps {
  assessmentId: string;
  samples: SampleSummary[];
}

export function SamplesTable({ assessmentId, samples }: SamplesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Samples</CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <Table className="min-w-[720px]">
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Sample Input</TableHead>
              <TableHead>Model Output</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="w-12">
                <span className="sr-only">Details</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {samples.map((sample) => (
              <TableRow
                key={sample.id}
                className="relative hover:bg-muted/60 has-focus-visible:outline-2 has-focus-visible:outline-ring"
              >
                <TableCell className="font-semibold">{sample.label}</TableCell>
                <TableCell>
                  <SampleThumbnail image={sample.thumbnail} />
                </TableCell>
                <TableCell>
                  <p className="font-serif font-semibold">
                    {formatConfidence(sample.referenceConfidence)}
                  </p>
                  <p className="text-xs text-muted-foreground">Confidence Score</p>
                </TableCell>
                <TableCell>
                  <ChangeIndicator
                    changePp={sample.resultChangePp}
                    className={
                      changeDirection(sample.resultChangePp) === 'none'
                        ? 'text-sm text-muted-foreground'
                        : 'font-serif text-base'
                    }
                  />
                </TableCell>
                <TableCell>{CATEGORY_LABELS[sample.categoryId]}</TableCell>
                <TableCell>
                  <Link
                    to={paths.sample.getHref(assessmentId, sample.id)}
                    className="flex justify-end text-muted-foreground after:absolute after:inset-0 hover:text-foreground focus-visible:outline-none"
                  >
                    <ChevronRight className="size-5" aria-hidden />
                    <span className="sr-only">View sample {sample.label}</span>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
