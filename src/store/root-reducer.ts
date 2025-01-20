import { combineReducers } from '@reduxjs/toolkit';
import { StoreSlice } from '@/shared/constants/store-slice';
import { citiesSlice } from '@/widgets/cities/model/cities.slice';
import { userSlice } from '@/entities/User/model/user.slice';
import { offerSlice } from '@/entities/Offer/model/offer.slice';

export const rootReducer = combineReducers({
  [StoreSlice.User]: userSlice.reducer,
  [StoreSlice.Cities]: citiesSlice.reducer,
  [StoreSlice.Offer]: offerSlice.reducer,
});
