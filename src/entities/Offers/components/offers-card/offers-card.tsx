import { Link } from 'react-router-dom';
import classNames from 'classnames';

import type { TOffer } from '@/entities/Offers/types';

import useRating from '@/shared/hooks/use-rating';

export type OffersCardOfferProps = {
  offer: TOffer;
  classPrefix?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function OffersCard({
  offer,
  classPrefix = '',
  onMouseEnter,
  onMouseLeave,
}: OffersCardOfferProps) {
  const { ratingWidthValue } = useRating(offer.rating);

  const offerDetailRoute = `offer/${offer.id}`;

  const cardClassName = classNames('place-card', {
    [`${classPrefix}__card`]: classPrefix.length,
  });

  const imageClassName = classNames('place-card__image-wrapper', {
    [`${classPrefix}__image-wrapper`]: classPrefix.length,
  });

  const infoClassName = classNames('place-card__info', {
    [`${classPrefix}__card-info`]: classPrefix.length && classPrefix === 'favorites',
  });

  const favoriteButtonClass = offer.isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

  const favoriteButtonLabel = offer.isFavorite
    ? 'In bookmarks'
    : 'To bookmarks';

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

      {/* TODO: previewImage */}
      <div className={imageClassName}>
        <Link to={offerDetailRoute}>
          <img
            className="place-card__image"
            src="img/apartment-small-04.jpg"
            width="260"
            height="200"
            alt={offer.title}
          />
        </Link>
      </div>

      <div className={infoClassName}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          <button className={favoriteButtonClass} type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">{favoriteButtonLabel}</span>
          </button>
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

export default OffersCard;
