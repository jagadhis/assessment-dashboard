import type { ReactNode } from 'react';

import { Breadcrumbs, type Crumb } from './breadcrumbs';

interface PageHeaderProps {
  breadcrumbs: Crumb[];
  title: ReactNode;
  actions?: ReactNode;
}

export function PageHeader({ breadcrumbs, title, actions }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3">
      <Breadcrumbs items={breadcrumbs} />
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-[1.75rem]">{title}</h1>
        {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
      </div>
    </div>
  );
}
