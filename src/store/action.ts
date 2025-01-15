import { createAction } from '@reduxjs/toolkit';
import type { TOfferArray } from '@/entities/Offers/types';
import type { TAuthStatus } from '@/shared/constants/auth';
import type { TUser } from '@/entities/User/types';

export const redirectToRoute = createAction<string>('app/redirectToRoute');

export const setCity = createAction<{ city: string }>('city/set');
export const setOffers = createAction<{ offers: TOfferArray }>('offers/set');
export const setOffersDataLoadingStatus = createAction<boolean>('offers/loading/set');
export const setAuthStatus = createAction<{ status: TAuthStatus }>('auth/set');

export const setUserData = createAction<{ profile: TUser }>('user/profile/set');
export const setUserFavorites = createAction<{ favorites: TOfferArray }>('user/favorites/set');
export const resetUser = createAction('user/reset');
