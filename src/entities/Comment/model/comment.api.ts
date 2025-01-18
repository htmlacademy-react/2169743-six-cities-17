import type { TOfferDetail } from '@/entities/Offer/types';
import type { TCommentParams } from '@/features/comment-form/types';
import { setComments, addComment } from '@/store/action';
import type { AppDispatch, State } from '@/store/types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AxiosInstance } from 'axios';
import type { TCommentArray, TComment } from '../types';

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
