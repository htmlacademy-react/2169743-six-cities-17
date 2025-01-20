import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '@/store/types';
import type { TOfferArray, TOfferDetail } from '../types';

export const fetchOffersAction = createAsyncThunk<TOfferArray, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOfferArray>('/offers');
    return data;
  },
);

export const fetchOfferDetailAction = createAsyncThunk<TOfferDetail, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOfferDetail>(`/offers/${offerId}`);
    return data;
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<TOfferArray, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/nearby/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TOfferArray>(`/offers/${offerId}/nearby`);
    return data;
  },
);

