export const PAGE_PATH = {
  main: '/',
  login: '/login',
  offer: '/offer',
  favorites: '/favorites',
} as const;

export const PAGE_ROUTE = {
  main: PAGE_PATH.main,
  login: PAGE_PATH.login,
  offer: `${PAGE_PATH.offer}/:id`,
  favorites: PAGE_PATH.favorites,
  notFound: '*',
} as const;
