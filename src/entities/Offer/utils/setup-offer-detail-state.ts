import type { TOfferDetailState } from './../types';

function setupOfferDetailState(): TOfferDetailState {
  return {
    data: null,
    offersNearby: [],
    comments: [],
  };
}

export default setupOfferDetailState;
