import { createSlice } from '@reduxjs/toolkit';
import type { TUserDataState } from '../types';
import { StoreSlice } from '@/shared/constants/store-slice';
import setupUserState from '../utils/setup-user-state';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';
import { checkAuthAction, loginUserAction, logoutUserAction } from './user.api';

export type TUserState = {
  authStatus: TAuthStatus;
  user: TUserDataState;
};

const initialState: TUserState = {
  authStatus: AUTH_STATUS.unknown,
  user: setupUserState(),
};

export const userSlice = createSlice({
  name: StoreSlice.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user.profile = action.payload;
        state.authStatus = AUTH_STATUS.auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = setupUserState();
        state.authStatus = AUTH_STATUS.unauth;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.user.profile = action.payload;
        state.authStatus = AUTH_STATUS.auth;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.user = setupUserState();
        state.authStatus = AUTH_STATUS.unauth;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.user = setupUserState();
        state.authStatus = AUTH_STATUS.unauth;
      });
  },
});
