import { Card } from '@/components/ui/card';
import { InfoTooltip } from '@/features/assessments/components/shared/info-tooltip';
import type { Metric } from '@/features/assessments/types/schemas';
import { formatPercent } from '@/lib/format';

export function MetricCard({ metric }: { metric: Metric }) {
  const title = `${metric.name} (${metric.abbreviation})`;
  return (
    <Card className="flex min-h-38 flex-col justify-between gap-4 p-4 sm:p-card">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-label text-muted-foreground">{title}</h2>
        <InfoTooltip label={title} content={metric.description} />
      </div>
      <p className="font-serif text-stat font-semibold tracking-tight sm:text-kpi">
        {formatPercent(metric.valuePercent)}
      </p>
    </Card>
  );
}
