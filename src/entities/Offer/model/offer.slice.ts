import { createSlice } from '@reduxjs/toolkit';
import type { TOfferArray, TOfferDetailState } from '../types';
import { StoreSlice } from '@/shared/constants/store-slice';
import setupOfferDetailState from '../utils/setup-offer-detail-state';

const initialState: {
  offers: TOfferArray;
  isOffersDataLoading: boolean;
  detail: TOfferDetailState;
} = {
  offers: [],
  isOffersDataLoading: false,
  detail: setupOfferDetailState(),
};

export const offerSlice = createSlice({
  name: StoreSlice.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
