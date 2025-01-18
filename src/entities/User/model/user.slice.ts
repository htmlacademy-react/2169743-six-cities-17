import { createSlice } from '@reduxjs/toolkit';
import type { TUserState } from '../types';
import { StoreSlice } from '@/shared/constants/store-slice';
import setupUserState from '../utils/setup-user-state';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';
import { checkAuthAction } from './user.api';

const initialState: {
  authStatus: TAuthStatus;
  user: TUserState;
} = {
  authStatus: AUTH_STATUS.unknown,
  user: setupUserState(),
};

export const userSlice = createSlice({
  name: StoreSlice.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state) => {

      })
      .addCase(checkAuthAction.rejected, (state) => {

      });
  },
});
