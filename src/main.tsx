import './styles/index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router/dom';

import { AppProviders } from '@/app/providers';
import { createAppRouter } from '@/app/router';
import { env } from '@/config/env';
import { setApiTransport } from '@/lib/api-client';

/** Loaded only when mocking is on, so a production build pointed at a backend never ships the fixtures. */
async function enableMocking() {
  if (!env.API_MOCKING) return;
  const { createMockTransport } = await import('@/testing/mocks/mock-transport');
  setApiTransport(createMockTransport({ delayMs: env.API_MOCK_DELAY_MS }));
}

const container = document.getElementById('root');
if (!container) throw new Error('Root element #root is missing from index.html');

void enableMocking().then(() => {
  createRoot(container).render(
    <StrictMode>
      <AppProviders>
        <RouterProvider router={createAppRouter()} />
      </AppProviders>
    </StrictMode>,
  );
});
