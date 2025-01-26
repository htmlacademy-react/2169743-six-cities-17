import { useMemo } from 'react';
import { groupBy } from 'lodash';
import classNames from 'classnames';
import type { TOffer } from '@/entities/Offer/types';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import OfferCardList from '@/entities/Offer/components/offer-card-list/offer-card-list';
import { getUserAuthStatus, getUserFavorites } from '@/entities/User/model/user.selector';

function FavoritesPage() {
  const userAuthStatus = useAppSelector(getUserAuthStatus);
  console.log('userAuthStatus', userAuthStatus);


  const favoriteOffers = useAppSelector(getUserFavorites);
  const groupedOffers = groupBy(favoriteOffers, ({ city }: TOffer) => city.name);
  const normalizeOffers = Object.entries(groupedOffers);

  const hasFavoriteOffers = useMemo(
    () => favoriteOffers.length > 0,
    [favoriteOffers],
  );

  const sectionClassName = classNames('favorites', {
    'favorites--empty': !hasFavoriteOffers,
  });

  return (
    <div className="page__favorites-container container">
      <section className={sectionClassName}>
        {hasFavoriteOffers ? (
          <>
            <h1 className="favorites__title">Saved listing</h1>

            <ul className="favorites__list">
              {normalizeOffers.map(([city, offersArray]) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>

                  <OfferCardList
                    offers={offersArray}
                    className="favorites__places"
                    classPrefix="favorites"
                    imageSize={{ width: 150, height: 110 }}
                  />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1 className="visually-hidden">Favorites (empty)</h1>
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default FavoritesPage;
