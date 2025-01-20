import { configureStore } from '@reduxjs/toolkit';
import request from '@/shared/request';
import { redirect } from './middleware/redirect';
import { rootReducer } from './root-reducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: request,
      },
    }).concat(redirect),
});
