import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { TOffer, TOfferArray, TOfferDetailState } from './../types';
import { StoreSlice } from '@/shared/constants/store-slice';
import setupOfferDetailState from './../utils/setup-offer-detail-state';
import { fetchOfferDetailAction, fetchOffersAction, fetchOffersNearbyAction } from './offer.api';
import { fetchCommentsByOfferIdAction, sendCommentAction } from '@/entities/Comment/model/comment.api';
import { logoutUserAction } from '@/entities/User/model/user.api';

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
  isDetailDataLoading: true,
  isDetailError: true,
};

export const offerSlice = createSlice({
  name: StoreSlice.Offer,
  initialState,
  reducers: {
    toggleOfferFavorite(state, action: PayloadAction<{
      offerId: TOffer['id'];
      status: boolean;
    }>) {
      const { offerId, status } = action.payload;
      const offerIndex = state.offers.findIndex((offer) => offer.id === offerId);

      if (offerIndex !== -1) {
        state.offers[offerIndex].isFavorite = status;
      }
    },
    toggleOfferDetailFavorite(state, action: PayloadAction<{
      offerId: TOffer['id'];
      status: boolean;
    }>) {
      if (state.detail.data === null) {
        return;
      }

      const { offerId, status } = action.payload;
      const detailOfferId = state.detail.data?.id;

      if (detailOfferId === offerId) {
        state.detail.data.isFavorite = status;
      }
    },
    toggleOfferNearbyFavorite(state, action: PayloadAction<{
      offerId: TOffer['id'];
      status: boolean;
    }>) {
      const { offerId, status } = action.payload;
      const offerIndex = state.detail.offersNearby.findIndex((offer) => offer.id === offerId);

      if (offerIndex !== -1) {
        state.detail.offersNearby[offerIndex].isFavorite = status;
      }
    },
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
        state.isDetailError = false;
        state.detail.data = action.payload;
      })
      .addCase(fetchOfferDetailAction.rejected, (state) => {
        state.detail = setupOfferDetailState();
        state.isDetailDataLoading = false;
        state.isDetailError = true;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        if (state.detail.data !== null) {
          state.detail.data.isFavorite = false;
        }
      })
      .addCase(logoutUserAction.rejected, (state) => {
        if (state.detail.data !== null) {
          state.detail.data.isFavorite = false;
        }
      })
      .addCase(fetchCommentsByOfferIdAction.fulfilled, (state, action) => {
        state.detail.comments = action.payload;
      })
      .addCase(fetchOffersNearbyAction.fulfilled, (state, action) => {
        state.detail.offersNearby = action.payload;
      })
      .addCase(sendCommentAction.fulfilled, (state, action) => {
        state.detail.comments.push(action.payload);
      });
  },
});

export const {
  toggleOfferFavorite,
  toggleOfferDetailFavorite,
  toggleOfferNearbyFavorite,
  resetOfferDetail,
} = offerSlice.actions;
