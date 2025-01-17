import { createAction } from '@reduxjs/toolkit';
import type { TOfferArray, TOfferDetail } from '@/entities/Offer/types';
import type { TAuthStatus } from '@/shared/constants/auth';
import type { TUser } from '@/entities/User/types';
import type { TComment, TCommentArray } from '@/entities/Comment/types';

export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const setCity = createAction<{ city: string }>('city/set');
export const setOffersDataLoadingStatus = createAction<boolean>('offers/loading/set');
export const setAuthStatus = createAction<{ status: TAuthStatus }>('auth/set');

export const setOfferDetailError = createAction<boolean>('offers/detail/loading/set');
export const setOffers = createAction<{ offers: TOfferArray }>('offers/set');
export const setOffersNearby = createAction<{ offers: TOfferArray }>('offers/detail/nearby/set');
export const setComments = createAction<{ comments: TCommentArray }>('offers/detail/comments/set');
export const addComment = createAction<{ comment: TComment }>('offers/detail/comment/add');
export const setOfferDetail = createAction<{ detail: TOfferDetail }>('offers/detail/set');
export const resetOfferDetail = createAction('offers/detail/reset');

export const setUserData = createAction<{ profile: TUser }>('user/profile/set');
export const setUserFavorites = createAction<{ favorites: TOfferArray }>('user/favorites/set');
export const resetUser = createAction('user/reset');
