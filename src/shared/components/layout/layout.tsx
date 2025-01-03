import { Outlet, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import Header from '@/widgets/header/header';
import Footer from '@/widgets/footer/footer';

import { PAGE_PATH, PAGE_ROUTE } from '@/shared/constants/page-path';

function Layout() {
  const { pathname } = useLocation();

  const pageClassName = classNames('page', {
    'page--gray page--main': pathname === PAGE_ROUTE.main,
    'page--gray page--login': pathname === PAGE_ROUTE.login,
  });

  const mainClassName = classNames('page__main', {
    'page__main--index': pathname === PAGE_ROUTE.main,
    'page__main--login': pathname === PAGE_ROUTE.login,
    'page__main--offer': pathname.startsWith(PAGE_PATH.offer),
    'page__main--favorites': pathname === PAGE_ROUTE.favorites,
  });

  return (
    <div className={pageClassName}>
      <Header />

      <main className={mainClassName}>
        <Outlet />
      </main>

      {pathname === PAGE_ROUTE.favorites && (
        <Footer />
      )}
    </div>
  );
}

export default Layout;
