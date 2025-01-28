const MIN_RATING = 0;
const MAX_RATING = 5;

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
