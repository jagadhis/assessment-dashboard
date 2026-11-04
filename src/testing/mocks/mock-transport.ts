import type { Transport } from '@/lib/api-client';

import { handlers, matchPath } from './handlers';

interface MockTransportOptions {
  /** Simulated network latency. */
  delayMs: number;
}

/** A transport that answers from the in-memory fixtures instead of the network. */
export function createMockTransport({ delayMs }: MockTransportOptions): Transport {
  return async (path) => {
    if (delayMs > 0) await new Promise((resolve) => setTimeout(resolve, delayMs));

    for (const handler of handlers) {
      const params = matchPath(handler.path, path);
      if (!params) continue;
      const body = handler.resolve(params);
      if (body === undefined) break;
      return body instanceof Blob ? new Response(body) : Response.json(body);
    }
    return Response.json({ message: `${path} not found` }, { status: 404 });
  };
}
