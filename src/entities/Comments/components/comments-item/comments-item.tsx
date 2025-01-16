import type { TComment } from './../../types';
import useRating from '@/shared/hooks/use-rating';
import normalizeDate from '@/shared/utils/normalize-date';

type CommentsItemProps = {
  comment: TComment;
};

function CommentsItem({ comment }: CommentsItemProps) {
  const { ratingWidthValue } = useRating(comment.rating);
  const { dateLabel, attrDateTime } = normalizeDate(comment.date);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            src={comment.user.avatarUrl}
            width="54"
            height="54"
            alt="Reviews avatar"
            className="reviews__avatar user__avatar"
          />
        </div>

        <span className="reviews__user-name">{comment.user.name}</span>
      </div>

      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{ width: ratingWidthValue }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <p className="reviews__text">{comment.comment}</p>

        <time
          className="reviews__time"
          dateTime={attrDateTime}
        >
          {dateLabel}
        </time>
      </div>
    </li>
  );
}

export default CommentsItem;
