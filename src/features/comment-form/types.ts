import type { TOfferDetail } from '@/entities/Offer/types';

export type CommentPayload = {
  comment: string;
  rating: number;
};

export type TCommentParams = {
  offerId: TOfferDetail['id'];
  payload: CommentPayload;
};
