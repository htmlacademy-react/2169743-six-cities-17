import { useState, useMemo, useCallback } from 'react';

import type { TOffer, TSortSelectOption } from '@/entities/Offer/types';
import { SORT_SELECT_PARAMS } from '@/entities/Offer/constants/sort-select-options';
import OfferCardList from '@/entities/Offer/components/offer-card-list/offer-card-list';
import OfferSortSelect from '@/entities/Offer/components/offer-sort-select/offer-sort-select';
import useFilteredOffersByCity from '@/entities/Offer/hooks/use-filtered-offers-by-city';

import Map from '@/features/map/map';
import useCurrentCityCoord from '@/features/map/hooks/use-current-city-coord';
import { mapPointMapper } from '@/features/map/utils/map-point-mapper';

import Spinner from '@/shared/components/spinner/spinner';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';

type CitiesProps = {
  currentCity: string;
};

function Cities({ currentCity }: CitiesProps) {
  const isLoading = useAppSelector((state) => state.isOffersDataLoading);

  /** Offer data */
  const filteredOffers = useFilteredOffersByCity();
  const [sortOffersType, setSortOffersType] = useState<TSortSelectOption['id']>(0);
  const normalizeOffers = useMemo(
    () => filteredOffers.toSorted(SORT_SELECT_PARAMS[sortOffersType]?.callback),
    [filteredOffers, sortOffersType],
  );

  /** Map data */
  const [activeCardId, setActiveCardId] = useState<TOffer['id']>('');
  const [cityMap, pointsMap] = useCurrentCityCoord();

  const handleMouseEnter = useCallback((id: TOffer['id']) => setActiveCardId(id), [setActiveCardId]);
  const handleMouseLeave = useCallback(() => setActiveCardId(''), [setActiveCardId]);
  const selectedCardCoord = useMemo(() => {
    const currentCard = filteredOffers.find((offer) => offer.id === activeCardId);

    if (!currentCard) {
      return undefined;
    }

    return mapPointMapper(currentCard);
  }, [filteredOffers, activeCardId]);

  return (
    <div className="cities">
      <div className="cities__places-container container">
        <section className="cities__places places" style={{ position: 'relative', minHeight: '366px' }}>
          {isLoading ? (
            <Spinner />
          ) : (
            <>
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {filteredOffers.length} places to stay in {currentCity}
              </b>

              <OfferSortSelect
                sortValue={sortOffersType}
                onSelect={(id: TSortSelectOption['id']) => setSortOffersType(id)}
              />

              {/* TODO: Offers-empty */}
              <OfferCardList
                offers={normalizeOffers}
                classPrefix="cities"
                className="tabs__content"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              />
            </>
          )}
        </section>

        <div className="cities__right-section">
          <section className="cities__map map" style={{ backgroundImage: 'initial' }}>
            <Map
              city={cityMap}
              points={pointsMap}
              selectedPoint={selectedCardCoord}
            />
          </section>
        </div>
      </div>
    </div>
  );
}

export default Cities;
