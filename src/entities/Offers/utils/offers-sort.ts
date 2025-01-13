import type { TOffer } from './../types';

export function sortPriceLowToHigh(a: TOffer, b: TOffer) {
  return a.price - b.price;
}

export function sortPriceHighToLow(a: TOffer, b: TOffer) {
  return b.price - a.price;
}

export function sortTopRatedFirst(a: TOffer, b: TOffer) {
  return b.rating - a.rating;
}
