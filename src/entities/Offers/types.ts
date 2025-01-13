import type { TOption } from '@/shared/types';

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
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type TOfferArray = Array<TOffer>;

export type TSortSelectOption = TOption & {
  callback?: (a: TOffer, b: TOffer) => number;
};
