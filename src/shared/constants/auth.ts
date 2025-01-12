export const AUTH_STATUS = {
  unknown: 'unknown',
  auth: 'auth',
  unauth: 'unauth',
} as const;

export type TAuthStatus = typeof AUTH_STATUS[keyof typeof AUTH_STATUS];
