import type { TOfferDetail } from '@/entities/Offers/types';

export type CommentPayload = {
  comment: string;
  rating: number;
};

export type TCommentParams = {
  offerId: TOfferDetail['id'];
  payload: CommentPayload;
};
