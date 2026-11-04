import { ArrowDown, ArrowUp } from 'lucide-react';

import { changeDirection, formatChangePp } from '@/lib/format';
import { cn } from '@/lib/utils';

interface ChangeIndicatorProps {
  changePp: number;
  className?: string;
}

/** Arrow, text and colour all carry the direction, so colour is never the only signal. */
export function ChangeIndicator({ changePp, className }: ChangeIndicatorProps) {
  const direction = changeDirection(changePp);
  const text = formatChangePp(changePp);

  if (direction === 'none') {
    return <span className={className}>{text}</span>;
  }

  const Arrow = direction === 'decrease' ? ArrowDown : ArrowUp;
  return (
    <span
      className={cn(
        'inline-flex items-center gap-0.5 whitespace-nowrap',
        direction === 'decrease' ? 'text-decrease' : 'text-increase',
        className,
      )}
    >
      <Arrow className="size-[1em] shrink-0" strokeWidth={1.75} aria-hidden />
      <span className="sr-only">{direction === 'decrease' ? 'Down' : 'Up'} </span>
      {text}
    </span>
  );
}
