export const PagePath = {
  Main: '/',
  Login: '/login',
  Offer: '/offer',
  Favorites: '/favorites',
} as const;

export const PageRoute = {
  Main: PagePath.Main,
  Login: PagePath.Login,
  Offer: `${PagePath.Offer}/:id`,
  Favorites: PagePath.Favorites,
  NotFound: '*',
} as const;
