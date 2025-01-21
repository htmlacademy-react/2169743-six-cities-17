import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '@/store/types';
import type { TOfferToggleParams, TUser } from '../types';
import type { AuthPayload } from '@/features/auth-form/types';
import { PAGE_PATH } from '@/shared/constants/page-path';
import jwtService from '@/shared/utils/jwt.service';
import { redirectToRoute } from '@/store/action';
import type { TOfferArray, TOfferDetail } from '@/entities/Offer/types';

export const checkAuthAction = createAsyncThunk<TUser, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TUser>('/login');
    return data;
  },
);

export const loginUserAction = createAsyncThunk<TUser, AuthPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (payload, { dispatch, extra: api }) => {
    const { data } = await api.post<TUser>('/login', payload);
    jwtService.saveToken(data.token);
    dispatch(redirectToRoute(PAGE_PATH.main));
    return data;
  },
);

export const logoutUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { extra: api }) => {
    await api.delete('/logout');
    jwtService.destroyToken();
  },
);

export const fetchFavoritesOffersAction = createAsyncThunk<TOfferArray, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/favorites/fetch',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<TOfferArray>('/favorite');
    return data;
  },
);

export const toggleOfferStatusAction = createAsyncThunk<TOfferDetail, TOfferToggleParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/favorites/toggle',
  async (params, { extra: api }) => {
    const { data } = await api.post<TOfferDetail>(`/favorite/${params.offerId}/${params.status}`);
    return data;
  },
);
