import { createAction } from '@reduxjs/toolkit';

export const setCity = createAction<{ city: string }>('city/set');
export const setOffers = createAction('offers/set');
