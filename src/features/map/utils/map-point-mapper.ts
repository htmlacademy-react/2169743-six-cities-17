import type { TOffer } from '@/entities/Offer/types';
import type { Point, City } from '@/features/map/types';

export function mapPointMapper({ title, location }: TOffer): Point {
  return {
    title,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export function mapCityMapper({ city }: TOffer): City {
  return {
    title: city.name,
    ...city.location,
  };
}
