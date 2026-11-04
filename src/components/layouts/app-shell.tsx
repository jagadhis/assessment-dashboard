import type { ReactNode } from 'react';
import { Outlet } from 'react-router';

import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

/** Renders the matched route, or `children` in its place (the loading state on first load). */
export function AppShell({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-dvh">
      <a
        href="#main"
        className="sr-only z-50 rounded-lg bg-surface px-4 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar />
        <main
          id="main"
          className="mx-auto w-full max-w-[90rem] flex-1 px-4 pt-5 pb-10 sm:px-gutter"
        >
          {children ?? <Outlet />}
        </main>
      </div>
    </div>
  );
}
