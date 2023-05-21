import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../dutlife-api/src/router';

export const trpc = createTRPCReact<AppRouter>();
