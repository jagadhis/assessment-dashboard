import { LogOut } from 'lucide-react';

import { Logo } from './logo';
import { NavItems, UnavailableItem } from './nav-items';

export function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-18 shrink-0 flex-col items-center border-r border-border bg-surface py-5 sm:flex">
      <Logo />
      <nav aria-label="Main" className="mt-10">
        <NavItems className="flex-col" />
      </nav>
      <div className="mt-auto">
        <UnavailableItem label="Sign out" icon={LogOut} />
      </div>
    </aside>
  );
}
