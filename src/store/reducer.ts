import { createReducer } from '@reduxjs/toolkit';
import { resetUser, setAuthStatus, setCity, setOffers, setOffersDataLoadingStatus, setUserData, setUserFavorites } from './action';

import type { TOfferArray } from '@/entities/Offers/types';
import type { TUserState } from '@/entities/User/types';
import setupUserState from '@/entities/User/utils/setup-user-store';

import { CITY_FILTER_DEFAULT } from '@/shared/constants/cities';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';

type State = {
  cityFilter: string;
  offers: TOfferArray;
  isOffersDataLoading: boolean;
  authStatus: TAuthStatus;
  user: TUserState;
};

const initialState: State = {
  cityFilter: CITY_FILTER_DEFAULT,
  offers: [],
  isOffersDataLoading: false,
  authStatus: AUTH_STATUS.unknown,
  user: setupUserState(),
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
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setAuthStatus, (state, action) => {
      const { status } = action.payload;
      state.authStatus = status;
    })
    .addCase(resetUser, (state) => {
      state.user = setupUserState();
      // todo: redirect
    })
    .addCase(setUserData, (state, action) => {
      const { profile } = action.payload;
      state.user.profile = profile;
    })
    .addCase(setUserFavorites, (state, action) => {
      const { favorites } = action.payload;
      state.user.favorites = favorites;
    });
});
