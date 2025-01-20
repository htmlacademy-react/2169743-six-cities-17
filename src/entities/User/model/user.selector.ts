import type { State } from '@/store/types';
import { StoreSlice } from '@/shared/constants/store-slice';

export const getUserAuthStatus = (state: Pick<State, StoreSlice.User>) => state[StoreSlice.User].authStatus;
export const getUserData = (state: Pick<State, StoreSlice.User>) => state[StoreSlice.User].user.profile;
export const getUserFavorites = (state: Pick<State, StoreSlice.User>) => state[StoreSlice.User].user.favorites;
