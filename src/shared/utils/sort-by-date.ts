import type { TComment } from '@/entities/Comment/types';

function sortByDate(a: TComment, b: TComment) {
  return new Date(b.date).getTime() - new Date(a.date).getTime();
}

export default sortByDate;
