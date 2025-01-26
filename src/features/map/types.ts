import type { TOffer } from '@/entities/Offer/types';

export type City = {
  title: string;
  latitude: number;
  longitude: number;
  zoom: number;
};

export type Point = {
  id: TOffer['id'];
  latitude: number;
  longitude: number;
};

export type Points = Point[];
