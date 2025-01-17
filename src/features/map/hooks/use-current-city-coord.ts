import type { City, Points } from '@/features/map/types';
import useFilteredOffersByCity from '@/entities/Offer/hooks/use-filtered-offers-by-city';
import { mapPointMapper, mapCityMapper } from '../utils/map-point-mapper';
import { CITY } from '@/mocks/city';
import { POINTS } from '@/mocks/points';

function useCurrentCityCoord(): [City, Points] {
  const filteredOffers = useFilteredOffersByCity();

  // TODO: Убрать моки
  if (filteredOffers.length === 0) {
    return [CITY, POINTS];
  }

  return [mapCityMapper(filteredOffers[0]), filteredOffers.map(mapPointMapper)];
}

export default useCurrentCityCoord;
