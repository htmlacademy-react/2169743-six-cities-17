import type { State } from '@/store/types';
import { StoreSlice } from '@/shared/constants/store-slice';

export const getOffers = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].offers;
export const getOffersDataLoading = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].isOffersDataLoading;
export const getOfferDetail = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].detail.data;
export const getOfferDetailComments = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].detail.comments;
export const getOfferDetailNearby = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].detail.offersNearby;
export const getOfferDetailError = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].isDetailError;
export const getOfferDetailDataLoading = (state: Pick<State, StoreSlice.Offer>) => state[StoreSlice.Offer].isDetailDataLoading;
