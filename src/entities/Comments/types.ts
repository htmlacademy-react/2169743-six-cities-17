export type CommentPayload = {
  comment: string;
  rating: number;
};

export type TComment = {
  id: string;
  date: string; // TODO: Date ?
  user: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  comment: string;
  rating: number;
};

export type TCommentArray = Array<TComment>;
