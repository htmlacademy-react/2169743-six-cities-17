import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { TOfferDetail } from '@/entities/Offer/types';
import type { TCommentParams } from '@/features/comment-form/types';
import type { AppDispatch, State } from '@/store/types';
import type { TCommentArray, TComment } from '../types';

export const fetchCommentsByOfferIdAction = createAsyncThunk<TCommentArray, TOfferDetail['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/comments/fetch',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<TCommentArray>(`/comments/${offerId}`);
    return data;
  },
);

export const sendCommentAction = createAsyncThunk<TComment, TCommentParams, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offers/detail/comment/send',
  async (params, { extra: api }) => {
    const { data } = await api.post<TComment>(`/comments/${params.offerId}`, params.payload);
    return data;
  },
);
