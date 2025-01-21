import type { Nullish } from '@/shared/types';
import type { TOffer, TOfferArray } from '@/entities/Offer/types';

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

export type TOfferToggleParams = {
  offerId: TOffer['id'];
  status: number;
}
