import { createSlice } from '@reduxjs/toolkit';
import { StoreSlice } from '@/shared/constants/store-slice';
import { CITY_FILTER_DEFAULT } from '@/shared/constants/cities';

const initialState: {
  cityFilter: string;
} = {
  cityFilter: CITY_FILTER_DEFAULT,
};

export const citiesSlice = createSlice({
  name: StoreSlice.Cities,
  initialState,
  reducers: {},
  extraReducers(builder) {},
});
