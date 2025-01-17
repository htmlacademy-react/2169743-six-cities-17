import type { TSortSelectOption } from './../types';
import { sortPriceLowToHigh, sortPriceHighToLow, sortTopRatedFirst } from './../utils/offers-sort';

export const SORT_SELECT_PARAMS: Array<TSortSelectOption> = [
  {
    id: 0,
    value: 'Popular',
  },
  {
    id: 1,
    value: 'Price: low to high',
    callback: sortPriceLowToHigh,
  },
  {
    id: 2,
    value: 'Price: high to low',
    callback: sortPriceHighToLow,
  },
  {
    id: 3,
    value: 'Top rated first',
    callback: sortTopRatedFirst,
  },
];
