import type { State } from '@/store/types';
import { StoreSlice } from '@/shared/constants/store-slice';

export const getCommentSendingStatus = (state: Pick<State, StoreSlice.Comment>) => state[StoreSlice.Comment].isSendingNewComment;
