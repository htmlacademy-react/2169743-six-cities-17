import { useState } from 'react';

import { setCity } from '@/store/action';

import type { TOffer } from '@/entities/Offers/types';
import OffersCardList from '@/entities/Offers/components/offers-card-list/offers-card-list';
import useFiteredOffersByCity from '@/entities/Offers/hooks/use-filtered-offers-by-city';

import Map from '@/widgets/map/map';
import useCurrentCityCoord from '@/widgets/map/hooks/use-current-city-coord';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import CityListPicker from '@/shared/components/city-list-picker/city-list-picker';

function MainPage() {
  const [, setActiveCardId] = useState<TOffer['id']>('');
  const handleMouseEnter = (id: TOffer['id']) => setActiveCardId(id);
  const handleMouseLeave = () => setActiveCardId('');

  const cityFilter = useAppSelector((state) => state.cityFilter);
  const filteredOffers = useFiteredOffersByCity();
  const [cityMap, pointsMap] = useCurrentCityCoord();

  const dispatch = useAppDispatch();
  const handleClickCity = (city: string) => {
    dispatch(setCity({ city }));
  };

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
            <b className="places__found">{filteredOffers.length} places to stay in {cityFilter}</b>

            <form className="places__sorting">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>

            <OffersCardList
              offers={filteredOffers}
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
                selectedPoint={undefined}
              />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainPage;
