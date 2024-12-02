import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Layout from '@/components/layout/layout';
import PrivateRoute from '@/components/private-route/private-route';
import MainPage from '@/pages/main-page';
import LoginPage from '@/pages/login-page';
import OfferPage from '@/pages/offer-page';
import FavoritesPage from '@/pages/favorites-page';
import ErrorPage from '@/pages/error-page';

type AppProps = {
  countOffer: number;
};

function App(props: AppProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage {...props} />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="offer/:id" element={<OfferPage />} />
          <Route path="favorites" element={<PrivateRoute><FavoritesPage /></PrivateRoute>} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
