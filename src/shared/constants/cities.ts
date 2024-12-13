export const CITIES = [
  'paris',
  'cologne',
  'brussels',
  'amsterdam',
  'hamburg',
  'dusseldorf',
] as const;

export type TCity = typeof CITIES[number];
