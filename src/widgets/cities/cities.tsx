import { useState, useMemo } from 'react';
import classNames from 'classnames';

import type { TSortSelectOption } from '@/entities/Offer/types';
import { SORT_SELECT_PARAMS } from '@/entities/Offer/constants/sort-select-options';
import OfferCardList from '@/entities/Offer/components/offer-card-list/offer-card-list';
import OfferSortSelect from '@/entities/Offer/components/offer-sort-select/offer-sort-select';
import useFilteredOffersByCity from '@/entities/Offer/hooks/use-filtered-offers-by-city';

import Map from '@/features/map/map';
import useCurrentCityCoord from '@/features/map/hooks/use-current-city-coord';
import CitiesEmpty from './cities-empty';
import declOfNum from '@/shared/utils/decl-of-num';
import useSelectCoord from '@/features/map/hooks/use-select-coord';

type CitiesProps = {
  currentCity: string;
};

function Cities({ currentCity }: CitiesProps) {
  /** Offer data */
  const filteredOffers = useFilteredOffersByCity();
  const hasOffersData = filteredOffers.length > 0;
  const [sortOffersType, setSortOffersType] = useState<TSortSelectOption['id']>(0);
  const normalizeOffers = useMemo(
    () => filteredOffers.toSorted(SORT_SELECT_PARAMS[sortOffersType]?.callback),
    [filteredOffers, sortOffersType],
  );

  const citiesContainerClass = classNames('cities__places-container', 'container', {
    'cities__places-container--empty': !hasOffersData,
  });

  const placesLabel = declOfNum(filteredOffers.length, ['place', 'places', 'places']);

  /** Map data */
  const [cityMap, pointsMap] = useCurrentCityCoord();
  const { selectedCoord, handleMouseEnter, handleMouseLeave } = useSelectCoord(filteredOffers);

  return (
    <div className="cities" style={{ height: '100%' }}>
      <div className={citiesContainerClass}>
        {hasOffersData ? (
          <>
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>

              <b className="places__found">
                {filteredOffers.length} {placesLabel} to stay in {currentCity}
              </b>

              <OfferSortSelect
                sortValue={sortOffersType}
                onSelect={(id: TSortSelectOption['id']) => setSortOffersType(id)}
              />

              <OfferCardList
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
                  selectedPoint={selectedCoord}
                />
              </section>
            </div>
          </>
        ) : (
          <CitiesEmpty currentCity={currentCity} />
        )}
      </div>
    </div>
  );
}

export default Cities;
