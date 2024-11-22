import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const COUNT_OFFER = 5;

root.render(
  <React.StrictMode>
    <App countOffer={COUNT_OFFER} />
  </React.StrictMode>
);
