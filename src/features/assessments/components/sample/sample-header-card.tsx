import { Fragment, type ReactNode } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChangeIndicator } from '@/features/assessments/components/shared/change-indicator';
import type { Sample } from '@/features/assessments/types/schemas';
import { formatConfidence } from '@/lib/format';

interface StatProps {
  label: string;
  value: ReactNode;
  hint: string;
}

function Stat({ label, value, hint }: StatProps) {
  return (
    <div className="flex flex-1 flex-col gap-2 py-4 sm:py-0">
      <dt className="font-serif text-base">{label}</dt>
      <dd className="font-serif text-stat font-semibold">{value}</dd>
      <dd className="text-label text-muted-foreground">{hint}</dd>
    </div>
  );
}

export function SampleHeaderCard({ sample }: { sample: Sample }) {
  const stats: StatProps[] = [
    {
      label: 'Model Output (reference)',
      value: formatConfidence(sample.referenceConfidence),
      hint: 'Confidence score',
    },
    {
      label: 'Overall Result',
      value: <ChangeIndicator changePp={sample.overallChangePp} />,
      hint: 'Avg confidence score',
    },
    {
      label: 'Assessed Inputs',
      value: sample.inputs.length,
      hint: 'Total unique inputs assessed for this sample',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample {sample.label}</CardTitle>
        <CardDescription>
          View assessed inputs for this sample, including model outputs and results
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-5 xl:flex-row xl:items-center xl:gap-8">
        <div className="relative shrink-0">
          <img
            src={sample.image.src}
            width={sample.image.width}
            height={sample.image.height}
            alt={sample.image.alt}
            className="aspect-[5/2] w-full rounded-xl object-cover sm:max-w-md xl:w-[24.5rem] xl:max-w-none"
          />
          <span className="absolute top-3 left-3 rounded-md bg-foreground/80 px-2 py-1 text-caption text-white">
            {sample.label}
          </span>
        </div>
        <dl className="flex flex-1 flex-col divide-y divide-border sm:flex-row sm:gap-8 sm:divide-y-0">
          {stats.map((stat, index) => (
            <Fragment key={stat.label}>
              {index > 0 && (
                <div
                  className="hidden h-20 w-0.5 shrink-0 self-center rounded-full bg-border-strong sm:block"
                  aria-hidden
                />
              )}
              <Stat {...stat} />
            </Fragment>
          ))}
        </dl>
      </CardContent>
    </Card>
  );
}
