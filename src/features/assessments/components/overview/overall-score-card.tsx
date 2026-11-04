import { InfoTooltip } from '@/features/assessments/components/shared/info-tooltip';
import type { OverallScore } from '@/features/assessments/types/schemas';
import { cn } from '@/lib/utils';

const SCORE_HELP =
  'Composite risk score from 0 to 100, based on how often assessed inputs changed the model output. Lower means a more robust model.';

export function OverallScoreCard({ score }: { score: OverallScore | null }) {
  return (
    <div className="flex min-h-36 flex-col gap-2 rounded-card bg-linear-to-br from-brand-800 to-brand-600 p-5 text-white shadow-score">
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-serif text-lg font-semibold">Overall Score</h2>
        <InfoTooltip
          label="Overall Score"
          content={SCORE_HELP}
          className="bg-white/20 text-white hover:text-white"
        />
      </div>
      <p className={cn('font-serif font-semibold', score ? 'text-4xl' : 'text-4xl tracking-wide')}>
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
      <p className="text-xs leading-snug text-white/90">
        {score ? score.summary : 'Not applicable for this model output.'}
      </p>
    </div>
  );
}
