import { useId } from 'react';

import type { CategoryDegradation } from '@/features/assessments/types/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPercent } from '@/lib/format';
import { cn } from '@/lib/utils';

import { CATEGORY_LABELS } from '@/features/assessments/utils/categories';

const TICKS = [100, 80, 60, 40, 20, 0];

/** Darkest shade for the largest degradation, lighter as the value drops. */
const SHADES = [
  { bar: 'bg-chart-1', label: 'text-chart-1' },
  { bar: 'bg-chart-2', label: 'text-chart-2' },
  { bar: 'bg-chart-3', label: 'text-chart-3' },
  { bar: 'bg-chart-4', label: 'text-chart-4' },
] as const;

function shadeFor(rank: number) {
  return SHADES[Math.min(rank, SHADES.length - 1)] ?? SHADES[0];
}

export function DegradationChart({ data }: { data: CategoryDegradation[] }) {
  const titleId = useId();
  const ranked = [...data].sort((a, b) => b.degradationPercent - a.degradationPercent);
  const rankOf = (item: CategoryDegradation) => ranked.indexOf(item);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle id={titleId}>Degradation By Category</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-6">
        <figure aria-labelledby={titleId} className="flex h-full flex-col">
          <div className="flex min-h-64 flex-1 gap-3" aria-hidden>
            <div className="relative w-9 shrink-0 text-[0.6875rem] text-muted-foreground">
              {TICKS.map((tick) => (
                <span
                  key={tick}
                  className="absolute right-0 -translate-y-1/2"
                  style={{ top: `${100 - tick}%` }}
                >
                  {tick}%
                </span>
              ))}
            </div>
            <div className="relative flex-1">
              {TICKS.map((tick) => (
                <div
                  key={tick}
                  className="absolute inset-x-0 border-t border-dotted border-border-strong"
                  style={{ top: `${100 - tick}%` }}
                />
              ))}
              <div className="absolute inset-0 grid grid-cols-4 gap-2 px-0 sm:gap-8 sm:px-6">
                {data.map((item) => {
                  const shade = shadeFor(rankOf(item));
                  return (
                    <div
                      key={item.categoryId}
                      className="flex h-full flex-col items-center justify-end"
                    >
                      <span className={cn('mb-1 font-serif text-sm font-semibold', shade.label)}>
                        {formatPercent(item.degradationPercent)}
                      </span>
                      <div
                        className={cn('min-h-3 w-full max-w-20 rounded-xl', shade.bar)}
                        style={{ height: `${item.degradationPercent}%` }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="mt-2 flex gap-3" aria-hidden>
            <div className="w-9 shrink-0" />
            <div className="grid flex-1 grid-cols-4 gap-4 px-2 text-center text-[0.6875rem] leading-tight text-muted-foreground sm:gap-8 sm:px-6">
              {data.map((item) => (
                <span key={item.categoryId}>{CATEGORY_LABELS[item.categoryId]}</span>
              ))}
            </div>
          </div>
          <table className="sr-only">
            <caption>Confidence degradation per assessment category</caption>
            <thead>
              <tr>
                <th scope="col">Category</th>
                <th scope="col">Degradation</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.categoryId}>
                  <th scope="row">{CATEGORY_LABELS[item.categoryId]}</th>
                  <td>{formatPercent(item.degradationPercent)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      </CardContent>
    </Card>
  );
}
