import type { TOfferArray } from '@/entities/Offers/types';
import { CITIES } from '@/shared/constants/cities';

export const mockOffers: TOfferArray = [
  {
    id: '1af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'apartment',
    price: 100,
    city: {
      name: CITIES[0],
      location: {
        latitude: 48.8534,
        longitude: 2.3488,
        zoom: 8,
      },
    },
    location: {
      latitude: 48.8534,
      longitude: 2.3488,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: true,
    rating: -100,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '2af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'room',
    price: 110,
    city: {
      name: CITIES[1],
      location: {
        latitude: 50.9333,
        longitude: 6.95,
        zoom: 8,
      },
    },
    location: {
      latitude: 50.9333,
      longitude: 6.95,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2.5,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '3af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location 0',
    type: 'apartment',
    price: 120,
    city: {
      name: CITIES[2],
      location: {
        latitude: 50.8504,
        longitude: 4.56878,
        zoom: 8,
      },
    },
    location: {
      latitude: 50.8504,
      longitude: 4.56878,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 3,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '33af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location 1',
    type: 'apartment',
    price: 220,
    city: {
      name: CITIES[2],
      location: {
        latitude: 50.8504,
        longitude: 4.34878,
        zoom: 8,
      },
    },
    location: {
      latitude: 50.8504,
      longitude: 4.34878,
      zoom: 8,
    },
    isFavorite: true,
    isPremium: true,
    rating: 3,
    previewImage: 'https://url-to-image/image.png',
  },
  {
    id: '4af6f711-c28d-4121-82cd-e0b462a27f00',
    title: 'Beautiful & luxurious studio at great location',
    type: 'room',
    price: 130,
    city: {
      name: CITIES[3],
      location: {
        latitude: 52.374,
        longitude: 4.88969,
        zoom: 8,
      },
    },
    location: {
      latitude: 52.374,
      longitude: 4.88969,
      zoom: 8,
    },
    isFavorite: false,
    isPremium: false,
    rating: 15,
    previewImage: 'https://url-to-image/image.png',
  },
];
