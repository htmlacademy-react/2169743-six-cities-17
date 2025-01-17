import type { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from './types';
import { addComment, redirectToRoute, resetOfferDetail, resetUser, setAuthStatus, setComments, setOfferDetail, setOfferDetailError, setOffers, setOffersDataLoadingStatus, setOffersNearby, setUserData } from './action';
import type { TOfferArray, TOfferDetail } from '@/entities/Offer/types';
import type { AuthPayload } from '@/features/auth-form/types';
import { AUTH_STATUS } from '@/shared/constants/auth';
import jwtService from '@/shared/utils/jwt.service';
import type { TUser } from '@/entities/User/types';
import { PAGE_PATH } from '@/shared/constants/page-path';
import type { TComment, TCommentArray } from '@/entities/Comment/types';
import type { TCommentParams } from '@/features/comment-form/types';

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/fetch',
  async (_arg, { dispatch, extra: api }) => {
    dispatch(setOffersDataLoadingStatus(true));
    const { data } = await api.get<TOfferArray>('/offers');
    dispatch(setOffersDataLoadingStatus(false));
    dispatch(setOffers({ offers: data }));
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TUser>('/login');
      dispatch(setAuthStatus({ status: AUTH_STATUS.auth }));
      dispatch(setUserData({ profile: data }));
    } catch (e) {
      dispatch(resetUser());
      dispatch(setAuthStatus({ status: AUTH_STATUS.unauth }));
    }
  },
);

export const loginUserAction = createAsyncThunk<void, AuthPayload, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async (payload, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TUser>('/login', payload);
      jwtService.saveToken(data.token);
      dispatch(setAuthStatus({ status: AUTH_STATUS.auth }));
      dispatch(setUserData({ profile: data }));
      dispatch(redirectToRoute(PAGE_PATH.main));
    } catch (e) {
      dispatch(setAuthStatus({ status: AUTH_STATUS.unauth }));
    }
  },
);

export const logoutUserAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    await api.delete('/logout');
    jwtService.destroyToken();
    dispatch(resetUser());
    dispatch(setAuthStatus({ status: AUTH_STATUS.unauth }));
  },
);

export const fetchOfferByIdAction = createAsyncThunk<void, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/fetch',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<TOfferDetail>(`/offers/${offerId}`);
      dispatch(setOfferDetailError(false));
      dispatch(setOfferDetail({ detail: data }));
    } catch (error) {
      dispatch(setOfferDetailError(true));
      dispatch(resetOfferDetail());
    }
  },
);

export const fetchOffersNearbyAction = createAsyncThunk<void, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/nearby/fetch',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<TOfferArray>(`/offers/${offerId}/nearby`);
    dispatch(setOffersNearby({ offers: data }));
  },
);

export const fetchCommentsByOfferIdAction = createAsyncThunk<void, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/comments/fetch',
  async (offerId, { dispatch, extra: api }) => {
    const { data } = await api.get<TCommentArray>(`/comments/${offerId}`);
    dispatch(setComments({ comments: data }));
  },
);

export const sendCommentAction = createAsyncThunk<void, TCommentParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/comment/send',
  async (params, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<TComment>(`/comments/${params.offerId}`, params.payload);
      dispatch(addComment({ comment: data }));
    } catch (e) {
      // TODO: обработать коды ошибок
    }
  },
);
