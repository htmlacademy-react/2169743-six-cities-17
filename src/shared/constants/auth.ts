export const AuthStatus = {
  Unknown: 'unknown',
  Auth: 'auth',
  Unauth: 'unauth',
} as const;

export type TAuthStatus = typeof AuthStatus[keyof typeof AuthStatus];
