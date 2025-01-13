import classNames from 'classnames';
import type { TOffer, TOfferArray } from '@/entities/Offers/types';
import OffersCard, { type OffersCardOfferProps } from '@/entities/Offers/components/offers-card/offers-card';

type OffersCardListProps = {
  offers: TOfferArray;
  classPrefix?: string;
  className?: string;
  onMouseEnter?: (id: TOffer['id']) => void;
  onMouseLeave?: () => void;
};

function OffersCardList({
  offers,
  classPrefix = '',
  className = '',
  onMouseEnter,
  onMouseLeave,
}: OffersCardListProps) {
  const cardListeners = (offer: TOffer) => {
    const listeners: Pick<OffersCardOfferProps, 'onMouseEnter' | 'onMouseLeave'> = {};

    if (onMouseEnter !== undefined) {
      listeners.onMouseEnter = () => onMouseEnter(offer.id);
    }

    if (onMouseLeave !== undefined) {
      listeners.onMouseLeave = onMouseLeave;
    }

    return listeners;
  };

  // TODO: привести к одному виду
  const listClassName = classNames('places__list', {
    [className]: Boolean(className),
    [`${classPrefix}__places-list`]: Boolean(classPrefix),
  });

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OffersCard
          key={offer.id}
          offer={offer}
          classPrefix={classPrefix}
          {...cardListeners(offer)}
        />
      ))}
    </div>
  );
}

export default OffersCardList;
