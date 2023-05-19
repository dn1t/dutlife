export interface Data {
  [key: string]: string | boolean | number | undefined | Data;
}

export interface Tokens {
  csrfToken?: string;
  xToken?: string;
  updated?: number;
}
