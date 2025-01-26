import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { StoreSlice } from '@/shared/constants/store-slice';
import { CITY_FILTER_DEFAULT } from '@/widgets/locations/constants/cities';

export type TCitiesState = {
  cityFilter: string;
};

const initialState: TCitiesState = {
  cityFilter: CITY_FILTER_DEFAULT,
};

export const citiesSlice = createSlice({
  name: StoreSlice.Cities,
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<{ city: string }>) {
      state.cityFilter = action.payload.city;
    },
  },
});

export const { setCity } = citiesSlice.actions;
