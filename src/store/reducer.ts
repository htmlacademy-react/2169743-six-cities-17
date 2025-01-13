import { createReducer } from '@reduxjs/toolkit';
import { setAuthStatus, setCity, setOffers } from './action';

import type { TOfferArray } from '@/entities/Offers/types';
import { CITY_FILTER_DEFAULT } from '@/shared/constants/cities';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';

type State = {
  cityFilter: string;
  offers: TOfferArray;
  authStatus: TAuthStatus;
};

const initialState: State = {
  cityFilter: CITY_FILTER_DEFAULT,
  offers: [],
  authStatus: AUTH_STATUS.unknown,
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setCity, (state, action) => {
      const { city } = action.payload;
      state.cityFilter = city;
    })
    .addCase(setOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
    })
    .addCase(setAuthStatus, (state, action) => {
      const { status } = action.payload;
      state.authStatus = status;
    });
});
