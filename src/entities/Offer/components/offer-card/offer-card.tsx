import { Link } from 'react-router-dom';
import classNames from 'classnames';
import type { TOffer } from '@/entities/Offer/types';
import useRating from '@/shared/hooks/use-rating';
import BookmarkButton from '@/features/bookmark-button/bookmark-button';

export type OfferCardOfferProps = {
  offer: TOffer;
  classPrefix?: string;
  imageSize?: { width: number; height: number };
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OfferCard({
  offer,
  classPrefix = '',
  imageSize = { width: 260, height: 200 },
  onMouseEnter,
  onMouseLeave,
}: OfferCardOfferProps) {
  const { ratingWidthValue } = useRating(offer.rating);

  const offerDetailRoute = `/offer/${offer.id}`;

  const cardClassName = classNames('place-card', {
    [`${classPrefix}__card`]: Boolean(classPrefix),
  });

  const imageClassName = classNames('place-card__image-wrapper', {
    [`${classPrefix}__image-wrapper`]: Boolean(classPrefix),
  });

  const infoClassName = classNames('place-card__info', {
    [`${classPrefix}__card-info`]: Boolean(classPrefix) && classPrefix === 'favorites',
  });

  return (
    <article
      className={cardClassName}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={imageClassName}>
        <Link to={offerDetailRoute}>
          <img
            src={offer.previewImage}
            alt={offer.title}
            {...imageSize}
            className="place-card__image"
          />
        </Link>
      </div>

      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <BookmarkButton
            offerId={offer.id}
            isActive={offer.isFavorite}
            classPrefix="place-card"
          />
        </div>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidthValue }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={offerDetailRoute}>{offer.title}</Link>
        </h2>

        <p className="place-card__type" style={{ textTransform: 'capitalize' }}>
          {offer.type}
        </p>
      </div>
    </article>
  );
}

export default OfferCard;
