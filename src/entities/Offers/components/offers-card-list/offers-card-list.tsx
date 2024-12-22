import type { TOffer, TOfferArray } from '@/entities/Offers/types';
import OffersCard from '@/entities/Offers/components/offers-card/offers-card';

type OffersCardListProps = {
  offers: TOfferArray;
  onMouseEnter: (id: TOffer['id']) => void;
  onMouseLeave: () => void;
};

function OffersCardList({ offers, onMouseEnter, onMouseLeave }: OffersCardListProps) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <OffersCard
          key={offer.id}
          offer={offer}
          onMouseEnter={() => onMouseEnter(offer.id)}
          onMouseLeave={onMouseLeave}
          classPrefix="cities"
        />
      ))}
    </div>
  );
}

export default OffersCardList;
