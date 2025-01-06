import { useState, useMemo } from 'react';

import type { TOffer, TSortSelectOption } from '@/entities/Offers/types';
import { SORT_SELECT_PARAMS } from '@/entities/Offers/constants/sort-select-options';
import OffersCardList from '@/entities/Offers/components/offers-card-list/offers-card-list';
import OffersSortSelect from '@/entities/Offers/components/offers-sort-select/offers-sort-select';
import useFilteredOffersByCity from '@/entities/Offers/hooks/use-filtered-offers-by-city';

import Map from '@/features/map/map';
import useCurrentCityCoord from '@/features/map/hooks/use-current-city-coord';
import { mapPointMapper } from '@/features/map/utils/map-point-mapper';

type CitiesProps = {
  currentCity: string;
};

function Cities({ currentCity }: CitiesProps) {
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

  const handleMouseEnter = (id: TOffer['id']) => setActiveCardId(id);
  const handleMouseLeave = () => setActiveCardId('');
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
        <section className="cities__places places">
          <h2 className="visually-hidden">Places</h2>

          <b className="places__found">
            {filteredOffers.length} places to stay in {currentCity}
          </b>

          <OffersSortSelect
            sortValue={sortOffersType}
            onSelect={(id: TSortSelectOption['id']) => setSortOffersType(id)}
          />

          {/* TODO: Offers-empty */}
          <OffersCardList
            offers={normalizeOffers}
            classPrefix="cities"
            className="tabs__content"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
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
