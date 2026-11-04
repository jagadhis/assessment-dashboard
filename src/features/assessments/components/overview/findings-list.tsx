import type { Finding } from '@/features/assessments/types/schemas';
import { cn } from '@/lib/utils';

export function FindingsList({ findings, className }: { findings: Finding[]; className?: string }) {
  return (
    <ol className={cn('flex flex-col gap-4', className)}>
      {findings.map((finding, index) => (
        <li key={finding.id} className="flex items-start gap-3 text-label">
          <span
            className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-500"
            aria-hidden
          >
            {index + 1}
          </span>
          <span className="pt-0.5 leading-relaxed text-muted-foreground">{finding.text}</span>
        </li>
      ))}
    </ol>
  );
}
