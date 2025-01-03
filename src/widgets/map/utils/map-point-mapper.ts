import type { TOffer } from '@/entities/Offers/types';
import type { Point, City } from '@/widgets/map/types';

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
