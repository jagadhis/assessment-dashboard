import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-lg px-3 py-1 text-xs font-semibold whitespace-nowrap',
  {
    variants: {
      variant: {
        high: 'bg-priority-high text-priority-high-foreground',
        medium: 'bg-priority-medium text-priority-medium-foreground',
        low: 'bg-priority-low text-priority-low-foreground',
      },
    },
  },
);

function Badge({
  className,
  variant,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
