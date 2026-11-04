import { env } from '@/config/env';

import type { AssessmentApi } from './client';
import { createHttpApi } from './http-api';
import { createMockApi } from './mock/mock-api';

export type { AssessmentApi } from './client';
export { isNotFound } from './errors';
export * from './schemas';

/** Set VITE_API_BASE_URL to talk to a real backend; without it the app runs on fixtures. */
export const api: AssessmentApi = env.API_MOCKING
  ? createMockApi({ delayMs: env.API_MOCK_DELAY_MS })
  : createHttpApi(env.API_BASE_URL);
