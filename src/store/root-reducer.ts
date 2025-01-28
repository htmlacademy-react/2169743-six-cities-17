import { combineReducers } from '@reduxjs/toolkit';
import { StoreSlice } from '@/shared/constants/store-slice';
import { citiesSlice } from '@/widgets/cities/model/cities.slice';
import { userSlice } from '@/entities/User/model/user.slice';
import { offerSlice } from '@/entities/Offer/model/offer.slice';
import { commentSlice } from '@/entities/Comment/model/comment.slice';
import { mapSlice } from '@/features/map/model/map.slice';

export const rootReducer = combineReducers({
  [StoreSlice.User]: userSlice.reducer,
  [StoreSlice.Cities]: citiesSlice.reducer,
  [StoreSlice.Offer]: offerSlice.reducer,
  [StoreSlice.Comment]: commentSlice.reducer,
  [StoreSlice.Map]: mapSlice.reducer,
});
