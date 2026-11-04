import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

import { PageSkeleton } from '@/components/feedback/page-skeleton';
import { PageHeader } from '@/components/layout/page-header';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { QueryError } from '../components/shared/query-error';
import { useAssessments } from '../hooks/use-assessment';

export function AssessmentsPage() {
  const { data: assessments, error, refetch } = useAssessments();

  if (error) {
    return <QueryError error={error} resource="Assessments" onRetry={() => void refetch()} />;
  }
  if (!assessments) return <PageSkeleton />;

  return (
    <>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Assessments' }]}
        title="Assessments"
      />
      <Card>
        <CardContent className="pt-3">
          <Table className="min-w-[560px]">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Modality</TableHead>
                <TableHead>Overall Score</TableHead>
                <TableHead className="w-12">
                  <span className="sr-only">Open</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {assessments.map((assessment) => (
                <TableRow
                  key={assessment.id}
                  className="relative hover:bg-muted/60 has-focus-visible:outline-2 has-focus-visible:outline-ring"
                >
                  <TableCell className="font-serif text-base">{assessment.productName}</TableCell>
                  <TableCell className="capitalize">{assessment.modality}</TableCell>
                  <TableCell>
                    {assessment.overallScore
                      ? `${assessment.overallScore.value} / ${assessment.overallScore.max}`
                      : 'N/A'}
                  </TableCell>
                  <TableCell>
                    <Link
                      to={`/assessments/${assessment.id}`}
                      className="flex justify-end text-muted-foreground after:absolute after:inset-0 hover:text-foreground focus-visible:outline-none"
                    >
                      <ChevronRight className="size-5" aria-hidden />
                      <span className="sr-only">Open {assessment.productName}</span>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
