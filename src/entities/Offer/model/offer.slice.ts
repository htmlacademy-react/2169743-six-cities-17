import { createSlice } from '@reduxjs/toolkit';
import type { TOfferArray, TOfferDetailState } from '../types';
import { StoreSlice } from '@/shared/constants/store-slice';
import setupOfferDetailState from '../utils/setup-offer-detail-state';
import { fetchOfferDetailAction, fetchOffersAction, fetchOffersNearbyAction } from './offer.api';
import { fetchCommentsByOfferIdAction } from '@/entities/Comment/model/comment.api';

export type TOfferState = {
  offers: TOfferArray;
  isOffersDataLoading: boolean;
  detail: TOfferDetailState;
  isDetailDataLoading: boolean;
  isDetailError: boolean;
};

const initialState: TOfferState = {
  offers: [],
  isOffersDataLoading: false,
  detail: setupOfferDetailState(),
  isDetailDataLoading: false,
  isDetailError: false,
};

export const offerSlice = createSlice({
  name: StoreSlice.Offer,
  initialState,
  reducers: {
    resetOfferDetail(state) {
      state.detail = setupOfferDetailState();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.isOffersDataLoading = false;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOfferDetailAction.pending, (state) => {
        state.isDetailDataLoading = true;
      })
      .addCase(fetchOfferDetailAction.fulfilled, (state, action) => {
        state.isDetailDataLoading = false;
        state.detail.data = action.payload;
      })
      .addCase(fetchOfferDetailAction.rejected, (state) => {
        state.detail = setupOfferDetailState();
        state.isDetailDataLoading = false;
        state.isDetailError = true;
      })
      .addCase(fetchCommentsByOfferIdAction.fulfilled, (state, action) => {
        state.detail.comments = action.payload;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.detail.offersNearby = action.payload;
      });
  },
});
