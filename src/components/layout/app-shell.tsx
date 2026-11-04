import { Suspense } from 'react';
import { Outlet } from 'react-router';

import { PageSkeleton } from '@/components/feedback/page-skeleton';

import { Sidebar } from './sidebar';
import { TopBar } from './top-bar';

export function AppShell() {
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
        <main id="main" className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-8">
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
