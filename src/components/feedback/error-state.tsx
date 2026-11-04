import { CircleAlert } from 'lucide-react';
import type { ReactNode } from 'react';

import { Card } from '@/components/ui/card';

interface ErrorStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

export function ErrorState({ title, description, action }: ErrorStateProps) {
  return (
    <Card role="alert" className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <CircleAlert className="size-8 text-brand-500" aria-hidden />
      <h2 className="text-xl">{title}</h2>
      <p className="max-w-md text-sm text-muted-foreground">{description}</p>
      {action}
    </Card>
  );
}
