import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';

function Card({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('rounded-card border border-border bg-surface shadow-card', className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-1 px-5 pt-5 sm:px-6', className)} {...props} />;
}

function CardTitle({ className, children, ...props }: ComponentProps<'h2'>) {
  return (
    <h2 className={cn('text-lg leading-tight', className)} {...props}>
      {children}
    </h2>
  );
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-xs text-muted-foreground', className)} {...props} />;
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('px-5 pb-5 sm:px-6', className)} {...props} />;
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle };
