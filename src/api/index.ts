import type { AssessmentApi } from './client';
import { createHttpApi } from './http-api';
import { createMockApi } from './mock/mock-api';

export type { AssessmentApi } from './client';
export { isNotFound } from './errors';
export * from './schemas';

const SIMULATED_LATENCY_MS = import.meta.env.MODE === 'test' ? 0 : 450;

/** Set VITE_API_BASE_URL to talk to a real backend; without it the app runs on fixtures. */
export const api: AssessmentApi = import.meta.env.VITE_API_BASE_URL
  ? createHttpApi(import.meta.env.VITE_API_BASE_URL)
  : createMockApi({ delayMs: SIMULATED_LATENCY_MS });
