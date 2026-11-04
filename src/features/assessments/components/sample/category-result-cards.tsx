import { ChangeIndicator } from '@/features/assessments/components/shared/change-indicator';
import type { CategoryId, CategoryResult } from '@/features/assessments/types/schemas';
import { CATEGORY_LABELS } from '@/features/assessments/utils/categories';
import { formatConfidence } from '@/lib/format';
import { cn } from '@/lib/utils';

interface CategoryResultCardsProps {
  results: CategoryResult[];
  selectedId: CategoryId | undefined;
  onSelect: (categoryId: CategoryId) => void;
}

export function CategoryResultCards({ results, selectedId, onSelect }: CategoryResultCardsProps) {
  return (
    <div
      role="group"
      aria-label="Filter inputs by category"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
    >
      {results.map((result) => {
        const selected = result.categoryId === selectedId;
        return (
          <button
            key={result.categoryId}
            type="button"
            aria-pressed={selected}
            onClick={() => {
              onSelect(result.categoryId);
            }}
            className={cn(
              'flex flex-col gap-1.5 rounded-xl border border-border-strong bg-surface p-4 text-left transition-[border-color,box-shadow] hover:border-success-300',
              selected && 'border-success-300 shadow-selected',
            )}
          >
            <span className="flex items-baseline justify-between gap-2">
              <span className="font-serif text-base">{CATEGORY_LABELS[result.categoryId]}</span>
              <span className="text-[0.6875rem] whitespace-nowrap text-muted-foreground">
                {result.variantCount} Variants
              </span>
            </span>
            <span className="text-xs text-muted-foreground">
              {result.aggregation === 'maximum' ? 'Maximum degradation' : 'Average degradation'}
            </span>
            <ChangeIndicator
              changePp={result.changePp}
              className="font-serif text-2xl font-semibold"
            />
            <span className="text-xs text-muted-foreground">
              Baseline confidence: {formatConfidence(result.baselineConfidence)}
            </span>
          </button>
        );
      })}
    </div>
  );
}
