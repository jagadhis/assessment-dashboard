import type { z } from 'zod';

import { env } from '@/config/env';

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}

/** Sends one request for a path under the API root. */
export type Transport = (path: string, init: RequestInit) => Promise<Response>;

const httpTransport: Transport = (path, init) => fetch(`${env.API_BASE_URL}${path}`, init);

let transport: Transport = httpTransport;

/**
 * Replaces the network with another transport. The app calls it once at start-up when
 * mocking is on (see `src/main.tsx`), and the test setup calls it for every test run.
 */
export function setApiTransport(next: Transport) {
  transport = next;
}

async function request(path: string, accept: string): Promise<Response> {
  const response = await transport(path, { headers: { Accept: accept } });
  if (!response.ok) {
    throw new ApiError(`Request to ${path} failed with ${response.status}`, response.status);
  }
  return response;
}

/** Every response body is validated against a Zod schema before the UI sees it. */
export const api = {
  async get<T extends z.ZodType>(path: string, schema: T): Promise<z.output<T>> {
    const response = await request(path, 'application/json');
    return schema.parse(await response.json());
  },
  async getBlob(path: string): Promise<Blob> {
    const response = await request(path, '*/*');
    return response.blob();
  },
};
