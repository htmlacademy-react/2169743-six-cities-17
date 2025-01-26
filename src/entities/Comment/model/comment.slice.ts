import { createSlice } from '@reduxjs/toolkit';
import { sendCommentAction } from './comment.api';
import { StoreSlice } from '@/shared/constants/store-slice';

type TCommentState = {
  isSendingNewComment: boolean;
};

const initialState: TCommentState = {
  isSendingNewComment: false,
};

export const commentSlice = createSlice({
  name: StoreSlice.Comment,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(sendCommentAction.pending, (state) => {
        state.isSendingNewComment = true;
      })
      .addCase(sendCommentAction.rejected, (state) => {
        state.isSendingNewComment = false;
      })
      .addCase(sendCommentAction.fulfilled, (state) => {
        state.isSendingNewComment = false;
      });
  },
});
