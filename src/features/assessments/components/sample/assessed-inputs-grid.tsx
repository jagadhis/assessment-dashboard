import { ArrowRight, CircleCheck } from 'lucide-react';
import { useState } from 'react';

import type { AssessedInput } from '@/api';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const COLLAPSED_COUNT = 4;

interface AssessedInputsGridProps {
  inputs: AssessedInput[];
  selectedId: string | undefined;
  onSelect: (inputId: string) => void;
}

export function AssessedInputsGrid({ inputs, selectedId, onSelect }: AssessedInputsGridProps) {
  const [expanded, setExpanded] = useState(false);
  const selectedIndex = inputs.findIndex((input) => input.id === selectedId);
  const showAll = expanded || selectedIndex >= COLLAPSED_COUNT;
  const visible = showAll ? inputs : inputs.slice(0, COLLAPSED_COUNT);
  const canToggle = inputs.length > COLLAPSED_COUNT;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-lg">Assessed Inputs</h2>
          <p className="text-xs text-muted-foreground">
            Select an assessed input to view its result.
          </p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <p aria-live="polite">
            Showing {visible.length} of {inputs.length} inputs
          </p>
          {canToggle && (
            <>
              <span className="h-5 w-px bg-brand-300" aria-hidden />
              <Button
                variant="link"
                className="text-xs"
                aria-expanded={showAll}
                onClick={() => {
                  setExpanded(!showAll);
                }}
              >
                {showAll ? 'Show fewer inputs' : 'View all inputs'}
                <ArrowRight aria-hidden className={cn(showAll && 'rotate-180')} />
              </Button>
            </>
          )}
        </div>
      </div>

      <ul aria-label="Assessed inputs" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {visible.map((input) => {
          const selected = input.id === selectedId;
          return (
            <li key={input.id}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => {
                  onSelect(input.id);
                }}
                className={cn(
                  'relative flex w-full flex-col items-center gap-1 rounded-xl border border-border-strong bg-surface p-1.5 transition-colors hover:border-success-300',
                  selected && 'border-success-300 bg-success-50',
                )}
              >
                <img
                  src={input.image.src}
                  width={input.image.width}
                  height={input.image.height}
                  alt={input.image.alt}
                  loading="lazy"
                  className="aspect-[16/7] w-full rounded-lg object-cover"
                />
                <span className="text-xs font-semibold">{input.label}</span>
                {selected && (
                  <CircleCheck
                    className="absolute top-3 right-3 size-6 fill-success-600 text-white"
                    aria-hidden
                  />
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
