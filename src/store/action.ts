import { createAction } from '@reduxjs/toolkit';
import type { TOfferArray } from '@/entities/Offers/types';

export const setCity = createAction<{ city: string }>('city/set');
export const setOffers = createAction<{ offers: TOfferArray }>('offers/set');
