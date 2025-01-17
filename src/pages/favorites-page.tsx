import { groupBy } from 'lodash';
import type { TOffer } from '@/entities/Offer/types';
import OfferCard from '@/entities/Offer/components/offer-card/offer-card';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';

function FavoritesPage() {
  const offers = useAppSelector((state) => state.offers);
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

              <div className="favorites__places">
                {offersArray.length > 0 && offersArray.map((offer) => (
                  <OfferCard
                    key={offer.id}
                    offer={offer}
                    classPrefix="favorites"
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default FavoritesPage;
