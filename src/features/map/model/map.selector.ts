import type { State } from '@/store/types';
import { StoreSlice } from '@/shared/constants/store-slice';

export const getSelectedOfferId = (state: Pick<State, StoreSlice.Map>) => state[StoreSlice.Map].selectedOfferId;
