import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { AppDispatch, State } from '@/store/types';
import type { TUser } from '../types';
import { AUTH_STATUS } from '@/shared/constants/auth';
import type { AuthPayload } from '@/features/auth-form/types';
import { PAGE_PATH } from '@/shared/constants/page-path';
import jwtService from '@/shared/utils/jwt.service';
import { setAuthStatus, setUserData, resetUser, redirectToRoute } from '@/store/action';

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
