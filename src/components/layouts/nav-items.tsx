import { FileChartColumn, LayoutGrid, type LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { NavLink } from 'react-router';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { paths } from '@/config/paths';
import { cn } from '@/lib/utils';

const itemClass =
  'text-muted-foreground hover:bg-muted hover:text-foreground flex size-10 items-center justify-center rounded-xl transition-colors [&_svg]:size-5';

function RailTooltip({ label, children }: { label: string; children: ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right">{label}</TooltipContent>
    </Tooltip>
  );
}

export function UnavailableItem({ label, icon: Icon }: { label: string; icon: LucideIcon }) {
  return (
    <RailTooltip label={`${label} (coming soon)`}>
      <button type="button" aria-disabled="true" className={cn(itemClass, 'cursor-not-allowed')}>
        <Icon aria-hidden />
        <span className="sr-only">{label} (coming soon)</span>
      </button>
    </RailTooltip>
  );
}

export function NavItems({ className }: { className?: string }) {
  return (
    <ul className={cn('flex gap-3', className)}>
      <li>
        <RailTooltip label="Assessments">
          <NavLink
            to={paths.assessments.getHref()}
            className={({ isActive }) =>
              cn(itemClass, isActive && 'bg-brand-50 text-brand-700 hover:bg-brand-50')
            }
          >
            <LayoutGrid aria-hidden />
            <span className="sr-only">Assessments</span>
          </NavLink>
        </RailTooltip>
      </li>
      <li>
        <UnavailableItem label="Reports" icon={FileChartColumn} />
      </li>
    </ul>
  );
}
