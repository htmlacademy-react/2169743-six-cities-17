import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { fetchCommentsByOfferIdAction, fetchOfferByIdAction, fetchOffersNearbyAction } from '@/store/api-actions';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';

import ErrorPage from '@/pages/error-page';
import OfferDetail from '@/widgets/offer-detail/offer-detail';
import OffersNear from '@/widgets/offers-near/offers-near';

function OfferPage() {
  const params = useParams();
  const offerId = params?.id ?? '';

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOfferByIdAction(offerId))
      .then(() => {
        dispatch(fetchOffersNearbyAction(offerId));
        dispatch(fetchCommentsByOfferIdAction(offerId));
      })
      .catch(() => <ErrorPage />);
  }, [dispatch, offerId]);

  return (
    <>
      <OfferDetail />
      <OffersNear />
    </>
  );
}

export default OfferPage;
