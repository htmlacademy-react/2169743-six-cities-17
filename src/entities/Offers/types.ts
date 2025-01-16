import type { Nullish, TOption } from '@/shared/types';
import type { TCommentArray } from './../Comments/types';

type TOfferType = 'apartment' | 'room' | 'house' | 'hotel';

type TLocation = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type TOffer = {
  id: string;
  title: string;
  type: TOfferType;
  price: number;
  city: {
    name: string;
    location: TLocation;
  };
  location: TLocation;
  isFavorite?: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type TOfferArray = Array<TOffer>;

export type TSortSelectOption = TOption & {
  callback?: (a: TOffer, b: TOffer) => number;
};

export type TOfferDetail = Omit<TOffer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: Array<string>;
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: Array<string>;
  maxAdults: number;
};

export type TOfferDetailArray = Array<TOfferDetail>;

export type TOfferDetailState = {
  data: Nullish<TOfferDetail>;
  offersNearby: TOfferArray;
  comments: TCommentArray;
};
