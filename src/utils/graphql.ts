import type { Data, Tokens } from '../types';
import { fetch } from './fetch';

export async function graphql<T>(
  query: string,
  variables: Data,
  tokens: Tokens,
): Promise<T> {
  const res = await fetch('https://playentry.org/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(tokens?.csrfToken && { 'CSRF-Token': tokens.csrfToken }),
      ...(tokens?.xToken && { 'x-token': tokens.xToken }),
    },
    body: JSON.stringify({ query, variables }),
  });
  const json: { data: T } = await res.json();

  return json.data;
}
