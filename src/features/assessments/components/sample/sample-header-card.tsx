import type { ReactNode } from 'react';

import type { Sample } from '@/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { formatConfidence } from '@/lib/format';

import { ChangeIndicator } from '../shared/change-indicator';

function Stat({ label, value, hint }: { label: string; value: ReactNode; hint: string }) {
  return (
    <div className="flex flex-col gap-2 py-4 sm:px-8 sm:py-0 sm:first:pl-0">
      <dt className="font-serif text-base">{label}</dt>
      <dd className="font-serif text-3xl font-semibold">{value}</dd>
      <dd className="text-sm text-muted-foreground">{hint}</dd>
    </div>
  );
}

export function SampleHeaderCard({ sample }: { sample: Sample }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sample {sample.label}</CardTitle>
        <CardDescription>
          View assessed inputs for this sample, including model outputs and results
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6 pt-5 lg:flex-row lg:items-center">
        <div className="relative shrink-0">
          <img
            src={sample.image.src}
            width={sample.image.width}
            height={sample.image.height}
            alt={sample.image.alt}
            className="aspect-[5/2] w-full rounded-xl object-cover lg:w-96"
          />
          <span className="absolute top-3 left-3 rounded-md bg-foreground/80 px-2 py-1 text-[0.625rem] text-white">
            {sample.label}
          </span>
        </div>
        <dl className="grid flex-1 divide-y divide-border-strong sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <Stat
            label="Model Output (reference)"
            value={formatConfidence(sample.referenceConfidence)}
            hint="Confidence score"
          />
          <Stat
            label="Overall Result"
            value={<ChangeIndicator changePp={sample.overallChangePp} />}
            hint="Avg confidence score"
          />
          <Stat
            label="Assessed Inputs"
            value={sample.inputs.length}
            hint="Total unique inputs assessed for this sample"
          />
        </dl>
      </CardContent>
    </Card>
  );
}
