import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Header from '@/widgets/header/header';
import Footer from '@/widgets/footer/footer';

import { PagePath, PageRoute } from '@/shared/constants/page-path';
import useFilteredOffersByCity from '@/entities/Offer/hooks/use-filtered-offers-by-city';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getUserFavorites } from '@/entities/User/model/user.selector';

function Layout() {
  const { pathname } = useLocation();
  const filteredOffers = useFilteredOffersByCity();
  const favoriteOffers = useAppSelector(getUserFavorites);

  const pageClassName = classNames('page', {
    'page--gray page--main': pathname === PageRoute.Main,
    'page--gray page--login': pathname === PageRoute.Login,
  });

  const mainClassName = classNames('page__main', {
    'page__main--index': pathname === PageRoute.Main,
    'page__main--index-empty': pathname === PageRoute.Main && filteredOffers.length === 0,
    'page__main--login': pathname === PageRoute.Login,
    'page__main--offer': pathname.startsWith(PagePath.Offer),
    'page__main--favorites': pathname === PageRoute.Favorites,
    'page__main--favorites-empty': pathname === PageRoute.Favorites && favoriteOffers.length === 0,
  });

  return (
    <div className={pageClassName}>
      <Header />

      <main className={mainClassName}>
        <Outlet />
      </main>

      {pathname === PageRoute.Favorites && (
        <Footer />
      )}
    </div>
  );
}

export default Layout;
