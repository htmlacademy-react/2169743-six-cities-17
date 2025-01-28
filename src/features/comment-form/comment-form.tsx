import { Fragment, useMemo, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { toast } from 'react-toastify';
import type { CommentPayload } from './types';

import { RATINGS } from './constants/ratings';

import type { TOfferDetail } from '@/entities/Offer/types';
import { sendCommentAction } from '@/entities/Comment/model/comment.api';
import { getCommentSendingStatus } from '@/entities/Comment/model/comment.selector';

import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { valueMin, valueRange } from '@/shared/utils/validators/value-length';

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

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const [commentModel, setCommentModel] = useState<CommentPayload>(initialState);
  const handleResetState = () => {
    setCommentModel(initialState);
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
        {Object.entries(RATINGS).map(([id, title]) => (
          <Fragment key={id}>
            <input
              disabled={isSendingComment}
              checked={commentModel.rating === Number(id)}
              className="form__rating-input visually-hidden"
              name="rating"
              value={id}
              id={`${id}-stars`}
              type="radio"
              onChange={handleClickRating}
            />
            <label htmlFor={`${id}-stars`} className="reviews__rating-label form__rating-label" title={title}>
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>

      <textarea
        ref={commentRef}
        id="review"
        name="review"
        disabled={isSendingComment}
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
