import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/** The one card surface: every panel on every page uses this radius, border, shadow and padding. */
function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-card border border-border bg-surface shadow-card', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1 px-card pt-card', className)} {...props} />;
}

function CardTitle({ className, children, ...props }: ComponentProps<'h2'>) {
  return (
    <h2 className={cn('text-card-title', className)} {...props}>
      {children}
    </h2>
  );
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-card-subtitle text-muted-foreground', className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('px-card pb-card', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
