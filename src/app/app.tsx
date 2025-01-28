import { Route, Routes } from 'react-router-dom';

import Layout from '@/shared/components/layout/layout';
import PrivateRoute from '@/shared/components/private-route/private-route';
import MainPage from '@/pages/main-page/main-page';
import LoginPage from '@/pages/login-page/login-page';
import OfferPage from '@/pages/offer-page/offer-page';
import FavoritesPage from '@/pages/favorites-page/favorites-page';
import ErrorPage from '@/pages/error-page/error-page';

import { PageRoute } from '@/shared/constants/page-path';
import HistoryRouter from '@/shared/components/history-route/history-route';
import browserHistory from '@/shared/utils/browser-history';

function App() {
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route path={PageRoute.Main} element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path={PageRoute.Login} element={<LoginPage />} />
          <Route path={PageRoute.Offer} element={<OfferPage />} />
          <Route
            path={PageRoute.Favorites}
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          <Route path={PageRoute.NotFound} element={<ErrorPage />} />
        </Route>
      </Routes>
    </HistoryRouter>
  );
}

export default App;
