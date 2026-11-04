import { LogOut } from 'lucide-react';

import { Logo } from './logo';
import { NavItems, UnavailableItem } from './nav-items';

/**
 * The rail column stretches with the page, so its background and border run the full
 * height however long the content is; the inner column sticks to the viewport so the
 * logo, nav and sign-out stay in view while the page scrolls.
 */
export function Sidebar() {
  return (
    <aside className="hidden w-18 shrink-0 border-r border-border bg-surface sm:block">
      <div className="sticky top-0 flex h-dvh flex-col items-center py-5">
        <Logo />
        <nav aria-label="Main" className="mt-12">
          <NavItems className="flex-col" />
        </nav>
        <div className="mt-auto">
          <UnavailableItem label="Sign out" icon={LogOut} />
        </div>
      </div>
    </aside>
  );
}
