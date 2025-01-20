import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CommentPayload } from './types';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import type { TOfferDetail } from '@/entities/Offer/types';
import { fetchCommentsByOfferIdAction, sendCommentAction } from '@/entities/Comment/model/comment.api';

type CommentFormProps = {
  offerId?: TOfferDetail['id'];
};

function CommentForm({ offerId = '' }: CommentFormProps) {
  const dispatch = useAppDispatch();

  const [commentModel, setCommentModel] = useState<CommentPayload>({
    comment: '',
    rating: 0,
  });

  const handleClickRating = (e: ChangeEvent<HTMLInputElement>) => setCommentModel((prev) => ({
    ...prev,
    rating: Number(e.target.value),
  }));

  const handleInputComment = (e: ChangeEvent<HTMLTextAreaElement>) => setCommentModel((prev) => ({
    ...prev,
    comment: e.target.value,
  }));

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(sendCommentAction({
      offerId,
      payload: commentModel,
    })).then(() => dispatch(fetchCommentsByOfferIdAction(offerId)));
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmit}>
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        <input className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleClickRating} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleInputComment}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
