import type { Nullish } from '@/shared/types';
import type { TOfferArray } from '@/entities/Offer/types';

export type TUser = {
  name: string;
  avatarUrl: string;
  isPro: boolean;
  email: string;
  token: string;
};

export type TUserDataState = {
  profile: Nullish<TUser>;
  favorites: TOfferArray;
};
