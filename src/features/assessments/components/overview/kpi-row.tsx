import type { Assessment } from '@/features/assessments/types/schemas';

import { MetricCard } from './metric-card';
import { OverallScoreCard } from './overall-score-card';

/**
 * Five equal-height cards on wide screens, with the score card a little wider as in the
 * design. Below that the score card takes its own row and the metrics wrap under it.
 */
export function KpiRow({ assessment }: { assessment: Assessment }) {
  return (
    <div className="grid grid-cols-2 gap-section lg:grid-cols-4 xl:grid-cols-[minmax(0,1.08fr)_repeat(4,minmax(0,1fr))]">
      <OverallScoreCard
        score={assessment.overallScore}
        className="col-span-2 lg:col-span-4 xl:col-span-1"
      />
      {assessment.metrics.map((metric) => (
        <MetricCard key={metric.id} metric={metric} />
      ))}
    </div>
  );
}
