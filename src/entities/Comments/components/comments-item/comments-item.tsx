import type { TComment } from '../../types';
import useRating from '@/shared/hooks/use-rating';

type CommentsItemProps = {
  comment: TComment;
};

function CommentsItem({ comment }: CommentsItemProps) {
  const { ratingWidthValue } = useRating(comment.rating);

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        {/* Image */}
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src="img/avatar-max.jpg"
            width="54"
            height="54"
            alt="Reviews avatar"
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

        {/* TODO: date */}
        <time className="reviews__time" dateTime="2019-04-24">April 2019</time>
      </div>
    </li>
  );
}

export default CommentsItem;
