import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/shared/components/layout/layout';
import PrivateRoute from '@/shared/components/private-route/private-route';
import MainPage from '@/pages/main-page';
import LoginPage from '@/pages/login-page';
import OfferPage from '@/pages/offer-page';
import FavoritesPage from '@/pages/favorites-page';
import ErrorPage from '@/pages/error-page';

import { PAGE_ROUTE } from '@/shared/constants/page-path';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';

function App() {
  const authStatus = useAppSelector((state) => state.authStatus);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={PAGE_ROUTE.main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={PAGE_ROUTE.login} element={<LoginPage />} />
          <Route path={PAGE_ROUTE.offer} element={<OfferPage />} />
          <Route
            path={PAGE_ROUTE.favorites}
            element={
              <PrivateRoute authStatus={authStatus}>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path={PAGE_ROUTE.notFound} element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
