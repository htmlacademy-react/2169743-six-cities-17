import { useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import type { CommentPayload } from './types';
import type { TOfferDetail } from '@/entities/Offer/types';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { fetchCommentsByOfferIdAction, sendCommentAction } from '@/entities/Comment/model/comment.api';
import { valueMin, valueRange } from '@/shared/utils/validators/value-length';
import { getCommentSendingStatus } from '@/entities/Comment/model/comment.selector';

type CommentFormProps = {
  offerId?: TOfferDetail['id'];
};

const initialState: CommentPayload = {
  comment: '',
  rating: 0,
};

function CommentForm({ offerId = '' }: CommentFormProps) {
  const isSendingComment = useAppSelector(getCommentSendingStatus);
  const dispatch = useAppDispatch();

  const ratingPerfectRef = useRef<HTMLInputElement>(null);
  const ratingGoodRef = useRef<HTMLInputElement>(null);
  const ratingNotBadRef = useRef<HTMLInputElement>(null);
  const ratingBadlyRef = useRef<HTMLInputElement>(null);
  const ratingTerriblyRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [commentModel, setCommentModel] = useState<CommentPayload>(initialState);
  const handleResetState = () => {
    setCommentModel(initialState);

    [ratingPerfectRef, ratingGoodRef, ratingNotBadRef, ratingBadlyRef, ratingTerriblyRef].forEach((ref) => {
      ref.current!.checked = false;
    });

    commentRef.current!.value = '';
  };

  const isValidForm = useMemo(
    () => valueRange(commentModel.comment, 50, 300) && valueMin(commentModel.rating, 1),
    [commentModel],
  );

  const handleClickRating = (evt: ChangeEvent<HTMLInputElement>) => setCommentModel((prev) => ({
    ...prev,
    rating: Number(evt.target.value),
  }));

  const handleInputComment = (evt: ChangeEvent<HTMLTextAreaElement>) => setCommentModel((prev) => ({
    ...prev,
    comment: evt.target.value,
  }));

  const handleSubmitForm = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (isValidForm) {
      dispatch(sendCommentAction({
        offerId,
        payload: commentModel,
      }))
        .unwrap()
        .then(() => {
          handleResetState();
          dispatch(fetchCommentsByOfferIdAction(offerId));
        })
        .catch(() => {});
    } else {
      toast.warn('Invalid form data');
    }
  };

  return (
    <form className="reviews__form form" onSubmit={handleSubmitForm}>
      <label
        className="reviews__label form__label"
        htmlFor="review"
      >
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        <input ref={ratingPerfectRef} className="form__rating-input visually-hidden" name="rating" value="5" id="5-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input ref={ratingGoodRef} className="form__rating-input visually-hidden" name="rating" value="4" id="4-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input ref={ratingNotBadRef} className="form__rating-input visually-hidden" name="rating" value="3" id="3-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input ref={ratingBadlyRef} className="form__rating-input visually-hidden" name="rating" value="2" id="2-stars" type="radio" onChange={handleClickRating} />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>

        <input ref={ratingTerriblyRef} className="form__rating-input visually-hidden" name="rating" value="1" id="1-star" type="radio" onChange={handleClickRating} />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>

      <textarea
        ref={commentRef}
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        className="reviews__textarea form__textarea"
        onChange={handleInputComment}
      />

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>

        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!isValidForm || isSendingComment}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
