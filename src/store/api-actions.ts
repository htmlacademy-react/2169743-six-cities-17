import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from './types';
import { redirectToRoute, resetUser, setAuthStatus, setOffers, setOffersDataLoadingStatus, setUserData } from './action';
import type { TOfferArray } from '@/entities/Offers/types';
import type { AuthPayload } from '@/features/auth-form/types';
import { AUTH_STATUS } from '@/shared/constants/auth';
import jwtService from '@/shared/utils/jwt.service';
import type { TUser } from '@/entities/User/types';
import { PAGE_PATH } from '@/shared/constants/page-path';

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

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TUser>('/login');
      dispatch(setAuthStatus({ status: AUTH_STATUS.auth }));
      dispatch(setUserData({ profile: data }));
    } catch (e) {
      dispatch(resetUser());
      dispatch(setAuthStatus({ status: AUTH_STATUS.unauth }));
    }
  },
);

export const loginUserAction = createAsyncThunk<void, AuthPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (payload, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TUser>('/login', payload);
      jwtService.saveToken(data.token);
      dispatch(setAuthStatus({ status: AUTH_STATUS.auth }));
      dispatch(setUserData({ profile: data }));
      dispatch(redirectToRoute(PAGE_PATH.main));
    } catch (e) {
      dispatch(setAuthStatus({ status: AUTH_STATUS.unauth }));
    }
  },
);

export const logoutUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');
    jwtService.destroyToken();
    dispatch(resetUser());
    dispatch(setAuthStatus({ status: AUTH_STATUS.unauth }));
  },
);
