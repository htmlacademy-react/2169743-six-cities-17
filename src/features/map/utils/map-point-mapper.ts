import type { TOffer, TOfferDetail } from '@/entities/Offer/types';
import type { Point, City } from '@/features/map/types';

export function mapPointMapper(offer: TOffer | TOfferDetail | null | undefined): Point {
  if (offer === null || offer === undefined) {
    return {
      id: '',
      latitude: 0,
      longitude: 0,
    };
  }

  const { id, location } = offer;

  return {
    id,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export function mapCityMapper(offer: TOffer | TOfferDetail | null | undefined): City {
  if (offer === null || offer === undefined) {
    return {
      title: '',
      latitude: 0,
      longitude: 0,
      zoom: 0,
    };
  }

  const { city } = offer;

  return {
    title: city.name,
    ...city.location,
  };
}
