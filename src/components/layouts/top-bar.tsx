import { UserRound } from 'lucide-react';

import { Logo } from './logo';
import { NavItems } from './nav-items';

export function TopBar() {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-surface px-4 sm:h-18 sm:border-b-0 sm:px-gutter">
      <div className="flex items-center gap-2 sm:hidden">
        <Logo />
        <nav aria-label="Main">
          <NavItems />
        </nav>
      </div>
      <div className="ml-auto flex items-center gap-4 sm:gap-5">
        <span className="font-serif text-base">Workspace</span>
        <span className="h-9 w-px bg-border-strong" aria-hidden />
        <span className="flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <UserRound className="size-5" aria-hidden />
          <span className="sr-only">Signed-in user</span>
        </span>
      </div>
    </header>
  );
}
