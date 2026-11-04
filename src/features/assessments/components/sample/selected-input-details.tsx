import { ArrowRightLeft } from 'lucide-react';
import { useState } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChangeIndicator } from '@/features/assessments/components/shared/change-indicator';
import type { AssessedInput, ImageAsset } from '@/features/assessments/types/schemas';
import { confidenceChangePp, formatConfidence } from '@/lib/format';

function InputPanel({ caption, image }: { caption: string; image: ImageAsset }) {
  return (
    <figure className="flex flex-col gap-2 rounded-xl bg-panel p-2.5">
      <figcaption className="px-1 text-card-subtitle">{caption}</figcaption>
      <img
        src={image.src}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        className="aspect-[5/3] w-full rounded-lg object-cover"
      />
    </figure>
  );
}

interface SelectedInputDetailsProps {
  reference: { image: ImageAsset; confidence: number };
  input: AssessedInput;
}

export function SelectedInputDetails({ reference, input }: SelectedInputDetailsProps) {
  const [swapped, setSwapped] = useState(false);
  const referencePanel = <InputPanel caption="Reference Input" image={reference.image} />;
  const inputPanel = (
    <InputPanel caption={`Selected Assessed Input (${input.label})`} image={input.image} />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Selected Input Details</CardTitle>
        <CardDescription>
          Comparison of the reference input and selected assessed input
        </CardDescription>
      </CardHeader>
      <CardContent className="grid items-center gap-x-6 gap-y-section pt-5 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] xl:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_minmax(15rem,0.8fr)]">
        {swapped ? inputPanel : referencePanel}
        <button
          type="button"
          aria-pressed={swapped}
          aria-label="Swap image positions"
          onClick={() => {
            setSwapped(!swapped);
          }}
          className="mx-auto flex size-11 items-center justify-center rounded-full border border-border bg-surface shadow-md transition-colors hover:bg-muted"
        >
          <ArrowRightLeft className="size-5" aria-hidden />
        </button>
        {swapped ? referencePanel : inputPanel}

        <div className="self-start md:col-span-3 xl:col-span-1">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Measure</TableHead>
                <TableHead>Confidence Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="text-xs text-muted-foreground">Reference Input</TableCell>
                <TableCell className="font-semibold">
                  {formatConfidence(reference.confidence)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs text-muted-foreground">
                  Assessed Input ({input.label})
                </TableCell>
                <TableCell className="font-semibold">
                  {formatConfidence(input.confidence)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="text-xs text-muted-foreground">Measured Change</TableCell>
                <TableCell className="font-semibold">
                  <ChangeIndicator
                    changePp={confidenceChangePp(reference.confidence, input.confidence)}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
