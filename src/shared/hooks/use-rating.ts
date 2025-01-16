import { MAX_RATING, MIN_RATING } from '@/shared/constants/rating';

function useRating(value: number = 0) {
  const normalizeRating = () => {
    if (value > MAX_RATING) {
      return MAX_RATING;
    } else if (value < MIN_RATING) {
      return MIN_RATING;
    } else {
      return Math.round(value);
    }
  };

  const ratingWidthValue = `${normalizeRating() * 20}%`;

  return {
    ratingWidthValue,
  };
}

export default useRating;
