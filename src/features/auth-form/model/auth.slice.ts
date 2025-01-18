import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '@/shared/constants/store-slice';
import { AUTH_STATUS, type TAuthStatus } from '@/shared/constants/auth';

const initialState: {
  authStatus: TAuthStatus;
} = {
  authStatus: AUTH_STATUS.unknown,
};

export const authSlice = createSlice({
  name: StoreSlice.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
