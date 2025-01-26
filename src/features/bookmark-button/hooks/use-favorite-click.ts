import { useNavigate } from 'react-router-dom';
import useAuth from '@/shared/hooks/use-auth';
import { PagePath } from '@/shared/constants/page-path';
import type { TOffer } from '@/entities/Offer/types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { fetchFavoritesOffersAction, toggleOfferStatusAction } from '@/entities/User/model/user.api';
import { getUserFavorites } from '@/entities/User/model/user.selector';
import { toggleOfferDetailFavorite, toggleOfferFavorite, toggleOfferNearbyFavorite } from '@/entities/Offer/model/offer.slice';

function useFavoriteClick() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuth } = useAuth();
  const favorites = useAppSelector(getUserFavorites);

  const handleFavoriteClick = (id: TOffer['id'] = '') => {
    if (isAuth) {
      const currentOffer = favorites.find((favoriteOffer) => favoriteOffer.id === id);
      const status = Number(!currentOffer?.isFavorite);

      dispatch(toggleOfferStatusAction({ offerId: id, status }))
        .unwrap()
        .then(() => {
          dispatch(fetchFavoritesOffersAction());
          [toggleOfferFavorite, toggleOfferDetailFavorite, toggleOfferNearbyFavorite].forEach((fn) => {
            dispatch(fn({
              offerId: id,
              status: Boolean(status),
            }));
          });
        })
        .catch(() => {});
    } else {
      navigate(PagePath.Login);
    }
  };

  return {
    handleFavoriteClick,
  };
}

export default useFavoriteClick;
