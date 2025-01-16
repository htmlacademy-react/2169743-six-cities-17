import classNames from 'classnames';

import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import useRating from '@/shared/hooks/use-rating';
import useAuth from '@/shared/hooks/use-auth';
import declOfNum from '@/shared/utils/decl-of-num';

import CommentForm from '@/features/comment-form/comment-form';
import CommentsList from '@/entities/Comments/components/comments-list/comments-list';

import Map from '@/features/map/map';
import { mapPointMapper } from '@/features/map/utils/map-point-mapper';

import { CITY } from '@/mocks/city';
import { OFFERS_NEAR } from '@/mocks/offers-near';

function OfferDetail() {
  const offer = useAppSelector((state) => state.offerDetail.data);
  const comments = useAppSelector((state) => state.offerDetail.comments);
  const { isAuth } = useAuth();
  const { ratingWidthValue } = useRating(offer?.rating);
  const normalizeMapPoints = OFFERS_NEAR.map(mapPointMapper);

  const offerBedroomLabel = `${offer?.bedrooms} ${declOfNum(offer?.bedrooms, ['Bedroom', 'Bedrooms', 'Bedrooms'])}`;
  const offerMaxAdultsLabel = `Max ${offer?.maxAdults} ${declOfNum(offer?.maxAdults, ['adult', 'adults', 'adults'])}`;

  const avatarWrapperClassname = classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {
    'offer__avatar-wrapper--pro': offer?.host.isPro,
  });

  const handleBookmarkClick = () => {};

  return (
    <section className="offer">
      <div className="offer__gallery-container container">
        <div className="offer__gallery">
          {offer?.images.map((image) => (
            <div key={image} className="offer__image-wrapper">
              <img
                src={image}
                alt="Photo studio"
                className="offer__image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="offer__container container">
        <div className="offer__wrapper">
          {offer?.isPremium && (
            <div className="offer__mark">
              <span>Premium</span>
            </div>
          )}

          <div className="offer__name-wrapper">
            <h1 className="offer__name">{offer?.title}</h1>

            <button
              className="offer__bookmark-button button"
              type="button"
              onClick={handleBookmarkClick}
            >
              <svg className="offer__bookmark-icon" width="31" height="33">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>

          <div className="offer__rating rating">
            <div className="offer__stars rating__stars">
              <span style={{ width: ratingWidthValue }}></span>
              <span className="visually-hidden">Rating</span>
            </div>
            <span className="offer__rating-value rating__value">
              {offer?.rating}
            </span>
          </div>

          <ul className="offer__features">
            <li className="offer__feature offer__feature--entire">
              {offer?.type}
            </li>
            <li className="offer__feature offer__feature--bedrooms">
              {offerBedroomLabel}
            </li>
            <li className="offer__feature offer__feature--adults">
              {offerMaxAdultsLabel}
            </li>
          </ul>

          <div className="offer__price">
            <b className="offer__price-value">&euro;{offer?.price}</b>
            <span className="offer__price-text">&nbsp;night</span>
          </div>

          <div className="offer__inside">
            <h2 className="offer__inside-title">What&apos;s inside</h2>
            <ul className="offer__inside-list">
              {offer?.goods.map((item) => (
                <li key={item} className="offer__inside-item">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="offer__host">
            <h2 className="offer__host-title">Meet the host</h2>

            <div className="offer__host-user user">
              <div className={avatarWrapperClassname}>
                <img
                  width="74"
                  height="74"
                  src={offer?.host.avatarUrl}
                  alt="Host avatar"
                  className="offer__avatar user__avatar"
                />
              </div>

              <span className="offer__user-name">{offer?.host.name}</span>

              {offer?.host.isPro && (
                <span className="offer__user-status">
                  Pro
                </span>
              )}
            </div>

            <div className="offer__description">
              <p className="offer__text">{offer?.description}</p>
            </div>
          </div>

          <section className="offer__reviews reviews">
            <h2 className="reviews__title">
              Reviews &middot;
              <span className="reviews__amount">{comments.length}</span>
            </h2>

            <CommentsList comments={comments} />

            {isAuth && (
              <CommentForm offerId={offer?.id} />
            )}
          </section>
        </div>
      </div>

      <section className="offer__map map" style={{ backgroundImage: 'initial' }}>
        {/* TODO: current offer coords */}
        <Map city={CITY} points={normalizeMapPoints} selectedPoint={undefined} />
      </section>
    </section>
  );
}

export default OfferDetail;
