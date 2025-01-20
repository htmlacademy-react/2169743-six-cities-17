import type { State } from '@/store/types';
import { StoreSlice } from '@/shared/constants/store-slice';

export const getCityFilter = (state: Pick<State, StoreSlice.Cities>) => state[StoreSlice.Cities].cityFilter;
