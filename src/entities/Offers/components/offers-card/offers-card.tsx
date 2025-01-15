import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import type { TOffer } from '@/entities/Offers/types';

import useRating from '@/shared/hooks/use-rating';
import useAuth from '@/shared/hooks/use-auth';
import { PAGE_PATH } from '@/shared/constants/page-path';

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
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { ratingWidthValue } = useRating(offer.rating);

  const offerDetailRoute = `offer/${offer.id}`;

  const cardClassName = classNames('place-card', {
    [`${classPrefix}__card`]: Boolean(classPrefix),
  });

  const imageClassName = classNames('place-card__image-wrapper', {
    [`${classPrefix}__image-wrapper`]: Boolean(classPrefix),
  });

  const infoClassName = classNames('place-card__info', {
    [`${classPrefix}__card-info`]: Boolean(classPrefix) && classPrefix === 'favorites',
  });

  const favoriteButtonClass = offer.isFavorite
    ? 'place-card__bookmark-button place-card__bookmark-button--active button'
    : 'place-card__bookmark-button button';

  const favoriteButtonLabel = offer.isFavorite
    ? 'In bookmarks'
    : 'To bookmarks';

  const handleFavoriteClick = () => {
    if (isAuth) {
      // TODO:
      return null;
    } else {
      navigate(PAGE_PATH.login);
    }
  };

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
            className="place-card__image"
            src={offer.previewImage}
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

          <button
            type="button"
            className={favoriteButtonClass}
            onClick={handleFavoriteClick}
          >
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
