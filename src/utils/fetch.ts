import fetchCookie from 'fetch-cookie';
import { CookieJar } from 'tough-cookie';
import { FileCookieStore } from 'tough-cookie-file-store';

export const fetch = fetchCookie(
  globalThis.fetch,
  new CookieJar(new FileCookieStore('./cookie.json')),
);
