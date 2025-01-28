import { useMemo } from 'react';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getOffers } from './../model/offer.selector';
import { getCityFilter } from '@/widgets/cities/model/cities.selector';

function useFilteredOffersByCity() {
  const offers = useAppSelector(getOffers);
  const cityFilter = useAppSelector(getCityFilter);

  const filteredOffers = useMemo(
    () => offers.filter((offer) => offer.city.name === cityFilter),
    [offers, cityFilter],
  );

  return filteredOffers;
}

export default useFilteredOffersByCity;
