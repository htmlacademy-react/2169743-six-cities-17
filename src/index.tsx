import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { store } from '@/store';
import { checkAuthAction, fetchFavoritesOffersAction } from '@/entities/User/model/user.api';

import App from '@/app/app';

await store.dispatch(checkAuthAction())
  .unwrap()
  .then(() => {
    store.dispatch(fetchFavoritesOffersAction());
  })
  .catch(() => {});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <ToastContainer position="bottom-right" />
      <App />
    </React.StrictMode>
  </Provider>,
);
