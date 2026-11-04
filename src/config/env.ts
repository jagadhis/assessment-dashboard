import { z } from 'zod';

const booleanFlag = z.enum(['true', 'false']).transform((value) => value === 'true');

const envSchema = z
  .object({
    MODE: z.string(),
    VITE_API_BASE_URL: z.string().min(1).optional(),
    VITE_API_MOCKING: booleanFlag.optional(),
  })
  .transform(({ MODE, VITE_API_BASE_URL, VITE_API_MOCKING }) => ({
    API_BASE_URL: VITE_API_BASE_URL ?? '',
    /** Mocking is on unless it is turned off or a backend URL is set. */
    API_MOCKING: VITE_API_MOCKING ?? !VITE_API_BASE_URL,
    /** Simulated latency of the mock API, so loading states are visible in development. */
    API_MOCK_DELAY_MS: MODE === 'test' ? 0 : 450,
  }))
  .refine((env) => env.API_MOCKING || env.API_BASE_URL, {
    message: 'VITE_API_BASE_URL is required when VITE_API_MOCKING is false',
  });

export type Env = z.infer<typeof envSchema>;

function parseEnv(): Env {
  const result = envSchema.safeParse(import.meta.env);
  if (!result.success) {
    throw new Error(`Invalid environment variables:\n${z.prettifyError(result.error)}`);
  }
  return result.data;
}

export const env = parseEnv();
