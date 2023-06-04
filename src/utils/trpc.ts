import {
  createTRPCProxyClient,
  createTRPCReact,
  httpBatchLink,
} from '@trpc/react-query';
import type { AppRouter } from '../../dutlife-api/src/router';

export const trpc = createTRPCReact<AppRouter>();
export const trpcQueryClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: '/trpc',
    }),
  ],
});
