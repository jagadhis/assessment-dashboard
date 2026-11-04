import type { Metric } from '@/features/assessments/types/schemas';
import { Card } from '@/components/ui/card';
import { formatPercent } from '@/lib/format';

import { InfoTooltip } from '@/features/assessments/components/shared/info-tooltip';

export function MetricCard({ metric }: { metric: Metric }) {
  const title = `${metric.name} (${metric.abbreviation})`;
  return (
    <Card className="flex min-h-36 flex-col justify-between gap-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-sm leading-snug text-muted-foreground">{title}</h2>
        <InfoTooltip label={title} content={metric.description} />
      </div>
      <p className="font-serif text-4xl font-semibold tracking-tight">
        {formatPercent(metric.valuePercent)}
      </p>
    </Card>
  );
}
