import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './reducer';
import request from '@/shared/request';
import { redirect } from './middleware/redirect';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: request,
      },
    }).concat(redirect),
});
