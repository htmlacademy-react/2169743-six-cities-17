import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCommentsByOfferIdAction, fetchOfferByIdAction, fetchOffersNearbyAction } from '@/store/api-actions';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';

import ErrorPage from '@/pages/error-page';
import OfferDetail from '@/widgets/offer-detail/offer-detail';
import OffersNear from '@/widgets/offers-near/offers-near';

function OfferPage() {
  const params = useParams();
  const offerId = params?.id ?? '';
  const isDetailError = useAppSelector((state) => state.isDetailError);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferByIdAction(offerId))
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
