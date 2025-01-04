import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';

import type { TOfferArray } from '@/entities/Offers/types';
import { CITY_FILTER_DEFAULT } from '@/shared/constants/cities';

import { mockOffers } from '@/mocks/offers';

type State = {
  cityFilter: string;
  offers: TOfferArray;
};

const initialState: State = {
  cityFilter: CITY_FILTER_DEFAULT,
  offers: mockOffers,
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
    });
});
