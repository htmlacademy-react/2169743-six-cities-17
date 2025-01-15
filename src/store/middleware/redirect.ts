import type { PayloadAction } from '@reduxjs/toolkit';
import type { Middleware } from 'redux';
import { reducer } from './../reducer';
import browserHistory from '@/shared/utils/browser-history';

type Reducer = ReturnType<typeof reducer>;

export const redirect: Middleware<unknown, Reducer> = () => (next) => (action: PayloadAction<string>) => {
  if (action.type === 'app/redirectToRoute') {
    browserHistory.push(action.payload);
  }

  return next(action);
};
