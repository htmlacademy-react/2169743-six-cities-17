import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';

import ErrorPage from '@/pages/error-page';
import OfferDetail from '@/widgets/offer-detail/offer-detail';
import OffersNear from '@/widgets/offers-near/offers-near';
import { getOfferDetailError } from '@/entities/Offer/model/offer.selector';
import { fetchOfferDetailAction, fetchOffersNearbyAction } from '@/entities/Offer/model/offer.api';
import { fetchCommentsByOfferIdAction } from '@/entities/Comment/model/comment.api';

function OfferPage() {
  const params = useParams();
  const offerId = params?.id ?? '';
  const isDetailError = useAppSelector(getOfferDetailError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params]);

  useEffect(() => {
    dispatch(fetchOfferDetailAction(offerId))
      .then(() => {
        dispatch(fetchOffersNearbyAction(offerId));
        dispatch(fetchCommentsByOfferIdAction(offerId));
      });
  }, [dispatch, offerId]);

  if (isDetailError) {
    return <ErrorPage />;
  }

  return (
    <>
      <OfferDetail />
      <OffersNear />
    </>
  );
}

export default OfferPage;
