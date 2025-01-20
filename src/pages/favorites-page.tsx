import { groupBy } from 'lodash';
import type { TOffer } from '@/entities/Offer/types';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getOffers } from '@/entities/Offer/model/offer.selector';
import OfferCardList from '@/entities/Offer/components/offer-card-list/offer-card-list';

function FavoritesPage() {
  const offers = useAppSelector(getOffers);
  const groupedOffers = groupBy(offers, ({ city }: TOffer) => city.name);
  const normalizeOffers = Object.entries(groupedOffers);

  return (
    <div className="page__favorites-container container">
      <section className="favorites">
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
      </section>
    </div>
  );
}

export default FavoritesPage;
