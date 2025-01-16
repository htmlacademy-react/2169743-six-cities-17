import OffersCardList from '@/entities/Offers/components/offers-card-list/offers-card-list';
import { useAppSelector } from '@/shared/hooks/use-app-dispatch';

function OffersNear() {
  const offersNear = useAppSelector((state) => state.offerDetail.offersNearby);

  return (
    <div className="container">
      <section className="near-places places">
        <h2 className="near-places__title">Other places in the neighbourhood</h2>

        <OffersCardList
          offers={offersNear}
          classPrefix="near-places"
          className="near-places__list"
        />
      </section>
    </div>
  );
}

export default OffersNear;
