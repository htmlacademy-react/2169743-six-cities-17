import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { StoreSlice } from '@/shared/constants/store-slice';
import type { TOffer } from '@/entities/Offer/types';

export type TMapState = {
  selectedOfferId: TOffer['id'];
};

const initialState: TMapState = {
  selectedOfferId: '',
};

export const mapSlice = createSlice({
  name: StoreSlice.Map,
  initialState,
  reducers: {
    setSelectedOfferId(state, action: PayloadAction<TOffer['id']>) {
      state.selectedOfferId = action.payload;
    },
  },
});

export const { setSelectedOfferId } = mapSlice.actions;
