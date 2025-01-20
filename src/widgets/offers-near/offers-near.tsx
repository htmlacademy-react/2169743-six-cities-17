import OfferCardList from '@/entities/Offer/components/offer-card-list/offer-card-list';
import { getOfferDetailNearby } from '@/entities/Offer/model/offer.selector';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';

function OffersNear() {
  const offersNear = useAppSelector(getOfferDetailNearby);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>

        <OfferCardList
          offers={offersNear}
          classPrefix="near-places"
          className="near-places__list"
        />
      </section>
    </div>
  );
}

export default OffersNear;
