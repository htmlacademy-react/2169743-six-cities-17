import { useState, useMemo } from 'react';

import { setCity } from '@/store/action';

import type { TOffer, TSortSelectOption } from '@/entities/Offers/types';
import OffersCardList from '@/entities/Offers/components/offers-card-list/offers-card-list';
import OffersSortSelect from '@/entities/Offers/components/offers-sort-select/offers-sort-select';
import useFilteredOffersByCity from '@/entities/Offers/hooks/use-filtered-offers-by-city';
import { SORT_SELECT_PARAMS } from '@/entities/Offers/constants/sort-select-options';

import Map from '@/widgets/map/map';
import useCurrentCityCoord from '@/widgets/map/hooks/use-current-city-coord';
import { mapPointMapper } from '@/widgets/map/utils/map-point-mapper';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import CityListPicker from '@/shared/components/city-list-picker/city-list-picker';

function MainPage() {
  const cityFilter = useAppSelector((state) => state.cityFilter);
  const filteredOffers = useFilteredOffersByCity();
  const [sortOffersType, setsortOffersType] = useState<TSortSelectOption['id']>(0);

  const normalizeOffers = useMemo(
    () => filteredOffers.toSorted(SORT_SELECT_PARAMS[sortOffersType]?.callback),
    [filteredOffers, sortOffersType],
  );

  const [cityMap, pointsMap] = useCurrentCityCoord();

  const dispatch = useAppDispatch();
  const handleClickCity = (city: string) => {
    dispatch(setCity({ city }));
  };

  const [activeCardId, setActiveCardId] = useState<TOffer['id']>('');
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
    <>
      <h1 className="visually-hidden">Cities</h1>

      <div className="tabs">
        <section className="locations container">
          <CityListPicker
            currentCity={cityFilter}
            onClick={handleClickCity}
          />
        </section>
      </div>

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">
              {filteredOffers.length} places to stay in {cityFilter}
            </b>

            <OffersSortSelect
              sortValue={sortOffersType}
              onSelect={(id: TSortSelectOption['id']) => setsortOffersType(id)}
            />

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
    </>
  );
}

export default MainPage;
