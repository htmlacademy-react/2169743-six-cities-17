export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type TCity = typeof CITIES[number];

export const CITY_FILTER_DEFAULT = CITIES[0];
