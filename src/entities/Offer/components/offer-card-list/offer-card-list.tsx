import { memo } from 'react';
import classNames from 'classnames';
import type { TOffer, TOfferArray } from '@/entities/Offer/types';
import OfferCard, { type OfferCardOfferProps } from '@/entities/Offer/components/offer-card/offer-card';

type OfferCardListProps = {
  offers: TOfferArray;
  classPrefix?: string;
  className?: string;
  imageSize?: { width: number; height: number };
  onMouseEnter?: (id: TOffer['id']) => void;
  onMouseLeave?: () => void;
};

function OfferCardListTemplate({
  offers,
  classPrefix = '',
  className = '',
  imageSize,
  onMouseEnter,
  onMouseLeave,
}: OfferCardListProps) {
  const cardListeners = (offer: TOffer) => {
    const listeners: Pick<OfferCardOfferProps, 'onMouseEnter' | 'onMouseLeave'> = {};

    if (onMouseEnter !== undefined) {
      listeners.onMouseEnter = () => onMouseEnter(offer.id);
    }

    if (onMouseLeave !== undefined) {
      listeners.onMouseLeave = onMouseLeave;
    }

    return listeners;
  };

  const listClassName = classNames('places__list', {
    [className]: Boolean(className),
    [`${classPrefix}__places-list`]: Boolean(classPrefix),
  });

  return (
    <div className={listClassName}>
      {offers.map((offer) => (
        <OfferCard
          key={offer.id}
          offer={offer}
          classPrefix={classPrefix}
          imageSize={imageSize}
          {...cardListeners(offer)}
        />
      ))}
    </div>
  );
}

const OfferCardList = memo(OfferCardListTemplate);

export default OfferCardList;
