import type { Assessment } from '@/api';

import { MetricCard } from './metric-card';
import { OverallScoreCard } from './overall-score-card';

export function KpiRow({ assessment }: { assessment: Assessment }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <OverallScoreCard score={assessment.overallScore} />
      {assessment.metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
