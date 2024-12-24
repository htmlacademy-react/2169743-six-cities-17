import type { TCommentArray } from '../../types';
import CommentsItem from '../comments-item/comments-item';

type CommentsListProps = {
  comments: TCommentArray;
};

function CommentsList({ comments }: CommentsListProps) {

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <CommentsItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentsList;
