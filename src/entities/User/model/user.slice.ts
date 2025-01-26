import { createSlice } from '@reduxjs/toolkit';
import type { TUserDataState } from '../types';
import { StoreSlice } from '@/shared/constants/store-slice';
import setupUserState from '../utils/setup-user-state';
import { AuthStatus, type TAuthStatus } from '@/shared/constants/auth';
import { checkAuthAction, fetchFavoritesOffersAction, loginUserAction, logoutUserAction } from './user.api';

export type TUserState = {
  authStatus: TAuthStatus;
  user: TUserDataState;
};

const initialState: TUserState = {
  authStatus: AuthStatus.Unknown,
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
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = setupUserState();
        state.authStatus = AuthStatus.Unauth;
      })
      .addCase(loginUserAction.fulfilled, (state, action) => {
        state.user.profile = action.payload;
        state.authStatus = AuthStatus.Auth;
      })
      .addCase(loginUserAction.rejected, (state) => {
        state.user = setupUserState();
        state.authStatus = AuthStatus.Unauth;
      })
      .addCase(logoutUserAction.fulfilled, (state) => {
        state.user = setupUserState();
        state.authStatus = AuthStatus.Unauth;
      })
      .addCase(logoutUserAction.rejected, (state) => {
        state.user = setupUserState();
        state.authStatus = AuthStatus.Unauth;
      })
      .addCase(fetchFavoritesOffersAction.fulfilled, (state, action) => {
        state.user.favorites = action.payload;
      });
  },
});
