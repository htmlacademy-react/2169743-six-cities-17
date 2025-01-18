import { setOffersDataLoadingStatus, setOffers, setOfferDetailError, setOfferDetail, resetOfferDetail, setOffersNearby } from '@/store/action';
import type { AppDispatch, State } from '@/store/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { TOfferArray, TOfferDetail } from '../types';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<TOfferArray>('/offers');
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers({ offers: data }));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/fetch',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TOfferDetail>(`/offers/${offerId}`);
      dispatch(setOfferDetailError(false));
      dispatch(setOfferDetail({ detail: data }));
    } catch (error) {
      dispatch(setOfferDetailError(true));
      dispatch(resetOfferDetail());
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/nearby/fetch',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<TOfferArray>(`/offers/${offerId}/nearby`);
    dispatch(setOffersNearby({ offers: data }));
  },
);

