import { createAction } from '@reduxjs/toolkit';
import type { TOfferArray } from '@/entities/Offers/types';
import type { TAuthStatus } from '@/shared/constants/auth';

export const setCity = createAction<{ city: string }>('city/set');
export const setOffers = createAction<{ offers: TOfferArray }>('offers/set');
export const setAuthStatus = createAction<{ status: TAuthStatus }>('auth/set');
