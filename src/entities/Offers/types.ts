import type { TCity } from '@/shared/constants/cities';

type TOfferType = 'apartment' | 'room';

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
    name: TCity;
    location: TLocation;
  };
  location: TLocation;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export type TOfferArray = Array<TOffer>;
