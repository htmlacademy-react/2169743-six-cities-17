import type { City, Points } from '@/features/map/types';
import useFilteredOffersByCity from '@/entities/Offer/hooks/use-filtered-offers-by-city';
import { mapPointMapper, mapCityMapper } from './../utils/map-point-mapper';

function useCurrentCityCoord(): [City, Points] {
  const filteredOffers = useFilteredOffersByCity();

  if (filteredOffers.length === 0) {
    return [{
      title: '',
      latitude: 0,
      longitude: 0,
      zoom: 0,
    }, []];
  }

  return [mapCityMapper(filteredOffers[0]), filteredOffers.map(mapPointMapper)];
}

export default useCurrentCityCoord;
