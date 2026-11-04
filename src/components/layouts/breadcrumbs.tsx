import { ChevronRight, House } from 'lucide-react';
import { Link } from 'react-router';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 font-serif text-label text-muted-foreground">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="size-3" aria-hidden />}
            {item.to ? (
              <Link
                to={item.to}
                className="flex items-center gap-1 rounded-sm transition-colors hover:text-foreground"
              >
                {index === 0 && <House className="size-3.5" aria-hidden />}
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
