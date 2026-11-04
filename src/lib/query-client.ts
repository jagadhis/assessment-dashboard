import { QueryClient } from '@tanstack/react-query';

import { isNotFound } from '@/lib/api-client';

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        retry: (failureCount, error) => !isNotFound(error) && failureCount < 2,
      },
    },
  });
}
