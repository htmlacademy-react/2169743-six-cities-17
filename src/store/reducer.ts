import { createReducer } from '@reduxjs/toolkit';
import { setCity, setOffers } from './action';
import { CITY_FILTER_DEFAULT } from '@/shared/constants/cities';
import { mockOffers } from '@/mocks/offers';

const initialState = {
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
      state.offers = action.payload;
    });
});
