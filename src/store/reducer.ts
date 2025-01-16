import { createReducer } from '@reduxjs/toolkit';
import { addComment, resetOfferDetail, resetUser, setAuthStatus, setCity, setComments, setOfferDetail, setOffers, setOffersDataLoadingStatus, setOffersNearby, setUserData, setUserFavorites } from './action';

import type { TOfferArray, TOfferDetailState } from '@/entities/Offers/types';
import type { TUserState } from '@/entities/User/types';
import setupUserState from '@/entities/User/utils/setup-user-state';

import setupOfferDetailState from '@/entities/Offers/utils/setup-offer-detail-state';

import { CITY_FILTER_DEFAULT } from '@/shared/constants/cities';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';

type State = {
  cityFilter: string;
  offers: TOfferArray;
  offerDetail: TOfferDetailState;
  isOffersDataLoading: boolean;
  authStatus: TAuthStatus;
  user: TUserState;
};

const initialState: State = {
  cityFilter: CITY_FILTER_DEFAULT,
  offers: [],
  offerDetail: setupOfferDetailState(),
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
    .addCase(resetOfferDetail, (state) => {
      state.offerDetail = setupOfferDetailState();
    })
    .addCase(setOffers, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
    })
    .addCase(setOffersNearby, (state, action) => {
      const { offers } = action.payload;
      state.offerDetail.offersNearby = offers;
    })
    .addCase(setOfferDetail, (state, action) => {
      const { detail } = action.payload;
      state.offerDetail.data = detail;
    })
    .addCase(setComments, (state, action) => {
      const { comments } = action.payload;
      state.offerDetail.comments = comments;
    })
    .addCase(addComment, (state, action) => {
      const { comment } = action.payload;
      state.offerDetail.comments = [...state.offerDetail.comments, comment];
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
