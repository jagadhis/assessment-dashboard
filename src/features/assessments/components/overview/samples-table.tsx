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

function ResultIndicator({ changePp }: { changePp: number }) {
  return (
    <ChangeIndicator
      changePp={changePp}
      className={
        changeDirection(changePp) === 'none'
          ? 'text-sm text-muted-foreground'
          : 'font-serif text-base'
      }
    />
  );
}

interface SamplesTableProps {
  assessmentId: string;
  samples: SampleSummary[];
}

/** A table from lg up; a compact list on narrower screens, where six columns do not fit. */
export function SamplesTable({ assessmentId, samples }: SamplesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Test Samples</CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        <ul className="divide-y divide-border lg:hidden">
          {samples.map((sample) => (
            <li key={sample.id} className="relative flex items-center gap-4 py-3">
              <SampleThumbnail image={sample.thumbnail} />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5 text-label">
                <p className="font-semibold">
                  {sample.label}
                  <span className="ml-2 font-serif">
                    {formatConfidence(sample.referenceConfidence)}
                  </span>
                </p>
                <ResultIndicator changePp={sample.resultChangePp} />
                <p className="truncate text-muted-foreground">
                  {CATEGORY_LABELS[sample.categoryId]}
                </p>
              </div>
              <Link
                to={paths.sample.getHref(assessmentId, sample.id)}
                className="text-muted-foreground after:absolute after:inset-0 hover:text-foreground"
              >
                <ChevronRight className="size-5" aria-hidden />
                <span className="sr-only">View sample {sample.label}</span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:block">
          <Table className="min-w-[720px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[14%]">#</TableHead>
                <TableHead className="w-[21%]">Sample Input</TableHead>
                <TableHead className="w-[19%]">Model Output</TableHead>
                <TableHead className="w-[19%]">Result</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="w-10">
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
                    <p className="text-card-subtitle text-muted-foreground">Confidence Score</p>
                  </TableCell>
                  <TableCell>
                    <ResultIndicator changePp={sample.resultChangePp} />
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
        </div>
      </CardContent>
    </Card>
  );
}
