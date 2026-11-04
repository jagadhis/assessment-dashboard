import { InfoTooltip } from '@/features/assessments/components/shared/info-tooltip';
import type { OverallScore } from '@/features/assessments/types/schemas';
import { cn } from '@/lib/utils';

const SCORE_HELP =
  'Composite risk score from 0 to 100, based on how often assessed inputs changed the model output. Lower means a more robust model.';

interface OverallScoreCardProps {
  score: OverallScore | null;
  className?: string;
}

export function OverallScoreCard({ score, className }: OverallScoreCardProps) {
  return (
    <div
      className={cn(
        'flex min-h-38 flex-col rounded-card bg-linear-to-br from-brand-800 to-brand-600 p-card text-white shadow-score',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-card-title font-semibold">Overall Score</h2>
        <InfoTooltip
          label="Overall Score"
          content={SCORE_HELP}
          className="rounded-full bg-white/20 text-white hover:text-white"
        />
      </div>
      <p className="mt-2 font-serif text-kpi font-semibold">
        {score ? (
          <>
            {score.value}
            <span className="ml-1.5 text-base font-medium">/ {score.max}</span>
          </>
        ) : (
          <>
            <span aria-hidden>N/A</span>
            <span className="sr-only">Not applicable</span>
          </>
        )}
      </p>
      <p className="mt-auto pt-3 text-card-subtitle text-white/90">
        {score ? score.summary : 'Not applicable for this model output.'}
      </p>
    </div>
  );
}
