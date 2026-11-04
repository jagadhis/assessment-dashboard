import { Badge } from '@/components/ui/badge';
import type { Priority } from '@/features/assessments/types/schemas';

const LABELS: Record<Priority, string> = { high: 'High', medium: 'Medium', low: 'Low' };

export function PriorityBadge({ priority }: { priority: Priority }) {
  return (
    <Badge variant={priority} className="w-24">
      {LABELS[priority]}
    </Badge>
  );
}
