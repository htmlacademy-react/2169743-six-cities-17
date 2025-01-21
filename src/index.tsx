import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '@/store';

import App from '@/app/app';
import { fetchOffersAction } from '@/entities/Offer/model/offer.api';
import { checkAuthAction, fetchFavoritesOffersAction } from '@/entities/User/model/user.api';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction()).then(() => {
  store.dispatch(fetchFavoritesOffersAction());
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer />
      <App />
    </React.StrictMode>
  </Provider>,
);
