import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import useRating from '@/shared/hooks/use-rating';
import useAuth from '@/shared/hooks/use-auth';
import declOfNum from '@/shared/utils/decl-of-num';
import sortByDate from '@/shared/utils/sort-by-date';
import ErrorPage from '@/pages/error-page/error-page';
import Spinner from '@/shared/components/spinner/spinner';

import { getOfferDetailNearby, getOfferDetailError, getOfferDetail, getOfferDetailComments, getOfferDetailDataLoading } from '@/entities/Offer/model/offer.selector';
import { fetchOfferDetailAction, fetchOffersNearbyAction } from '@/entities/Offer/model/offer.api';
// import { resetOfferDetail } from '@/entities/Offer/model/offer.slice';
import OfferCardList from '@/entities/Offer/components/offer-card-list/offer-card-list';

import BookmarkButton from '@/features/bookmark-button/bookmark-button';

import CommentForm from '@/features/comment-form/comment-form';
import CommentList from '@/entities/Comment/components/comment-list/comment-list';
import { fetchCommentsByOfferIdAction } from '@/entities/Comment/model/comment.api';

import Map from '@/features/map/map';
import { setSelectedOfferId } from '@/features/map/model/map.slice';
import { mapPointMapper, mapCityMapper } from '@/features/map/utils/map-point-mapper';
import useSelectCoord from '@/features/map/hooks/use-select-coord';

function OfferPage() {
  const params = useParams();
  const offerId = params?.id ?? '';
  const isDetailError = useAppSelector(getOfferDetailError);
  const isDetailDataLoading = useAppSelector(getOfferDetailDataLoading);
  const offersNear = useAppSelector(getOfferDetailNearby);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);

    dispatch(fetchOfferDetailAction(offerId))
      .unwrap()
      .then(() => {
        dispatch(setSelectedOfferId(offerId));
        dispatch(fetchOffersNearbyAction(offerId));
        dispatch(fetchCommentsByOfferIdAction(offerId));
      })
      .catch(() => {});

    // return () => {
    //   dispatch(resetOfferDetail());
    // };
  }, [dispatch, offerId]);

  /** Offer detail */
  const { isAuth } = useAuth();

  const offer = useAppSelector(getOfferDetail);
  const { ratingWidthValue } = useRating(offer?.rating);

  const comments = useAppSelector(getOfferDetailComments);
  const normalizeComments = comments.toSorted(sortByDate).slice(0, 10);

  const normalizeOffersNear = offersNear.slice(0, 3);
  const selectedMapPoint = useMemo(() => mapPointMapper(offer), [offer]);
  const normalizeMapCity = mapCityMapper(offersNear[0]);
  const normalizeMapPoints = [...normalizeOffersNear.map(mapPointMapper), selectedMapPoint];

  const incomeOffersMap = useMemo(() => {
    const offers = [...normalizeOffersNear];

    if (offer !== null) {
      offers.push(offer);
    }

    return offers;
  }, [normalizeOffersNear, offer]);

  /** Map data */
  const { selectedCoord, handleMouseEnter, handleMouseLeave } = useSelectCoord(incomeOffersMap, offer?.id);

  /** Labels */
  const offerBedroomLabel = `${offer?.bedrooms} ${declOfNum(offer?.bedrooms, ['Bedroom', 'Bedrooms', 'Bedrooms'])}`;
  const offerMaxAdultsLabel = `Max ${offer?.maxAdults} ${declOfNum(offer?.maxAdults, ['adult', 'adults', 'adults'])}`;

  const avatarWrapperClassname = classNames('offer__avatar-wrapper', 'user__avatar-wrapper', {
    'offer__avatar-wrapper--pro': offer?.host.isPro,
  });

  if (isDetailDataLoading) {
    return (
      <div style={{ position: 'relative', minHeight: '360px' }}>
        <Spinner />
      </div>
    );
  }

  if (offer === null || isDetailError) {
    return <ErrorPage />;
  }

  return (
    <>
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {offer?.images.slice(0, 6).map((image) => (
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

              <BookmarkButton
                offerId={offer?.id}
                isActive={offer?.isFavorite}
                classPrefix="offer"
                imageSize={{ width: 31, height: 33 }}
              />
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
              <li className="offer__feature offer__feature--entire" style={{ textTransform: 'capitalize' }}>
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

                <span className="offer__user-name">
                  {offer?.host.name}
                </span>

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

              <CommentList comments={normalizeComments} />

              {isAuth && (
                <CommentForm offerId={offer?.id} />
              )}
            </section>
          </div>
        </div>

        <section className="offer__map map" style={{ backgroundImage: 'initial' }}>
          <Map
            city={normalizeMapCity}
            points={normalizeMapPoints}
            selectedPoint={selectedCoord}
            isAcceptZoom={false}
          />
        </section>
      </section>

      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>

          <OfferCardList
            offers={normalizeOffersNear}
            classPrefix="near-places"
            className="near-places__list"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          />
        </section>
      </div>
    </>
  );
}

export default OfferPage;
