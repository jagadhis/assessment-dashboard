import '@testing-library/jest-dom/vitest';

import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

import { setApiTransport } from '@/lib/api-client';

import { createMockTransport } from './mocks/mock-transport';

setApiTransport(createMockTransport({ delayMs: 0 }));

afterEach(() => {
  cleanup();
});
