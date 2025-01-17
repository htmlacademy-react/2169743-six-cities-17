import type { TCommentArray } from '../../types';
import CommentItem from '../comment-item/comment-item';

type CommentListProps = {
  comments: TCommentArray;
};

function CommentList({ comments }: CommentListProps) {

  return (
    <ul className="reviews__list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </ul>
  );
}

export default CommentList;
