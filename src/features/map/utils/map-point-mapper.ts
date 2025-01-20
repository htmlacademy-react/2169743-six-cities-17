import type { TOffer, TOfferDetail } from '@/entities/Offer/types';
import type { Point, City } from '@/features/map/types';

export function mapPointMapper(offer: TOffer | TOfferDetail): Point {
  const { title, location } = offer;

  return {
    title,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export function mapCityMapper(offer: TOffer | TOfferDetail): City {
  const { city } = offer;

  return {
    title: city.name,
    ...city.location,
  };
}
