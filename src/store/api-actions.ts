import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from './types';
import { setOffers } from './action';
import type { TOfferArray } from '@/entities/Offers/types';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.get<TOfferArray>('/offers');
    dispatch(setOffers({ offers: data }));
  },
);

export const authUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/auth',
  async (_arg, { dispatch, extra: api }) => {
    const { data } = await api.post<TOfferArray>('/login');
    dispatch(setOffers({ offers: data }));
  },
);
