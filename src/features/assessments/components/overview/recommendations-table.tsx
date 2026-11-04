import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { Recommendation } from '@/features/assessments/types/schemas';

import { PriorityBadge } from './priority-badge';

export function RecommendationsTable({ recommendations }: { recommendations: Recommendation[] }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-10">#</TableHead>
          <TableHead>Recommendation</TableHead>
          <TableHead className="w-28">Priority</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recommendations.map((recommendation, index) => (
          <TableRow key={recommendation.id}>
            <TableCell className="font-semibold">{index + 1}</TableCell>
            <TableCell>{recommendation.text}</TableCell>
            <TableCell>
              <PriorityBadge priority={recommendation.priority} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
