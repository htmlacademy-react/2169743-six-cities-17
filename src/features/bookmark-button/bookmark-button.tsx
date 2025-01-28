import { memo } from 'react';
import classNames from 'classnames';
import type { TOffer } from '@/entities/Offer/types';
import useFavoriteClick from '@/features/bookmark-button/hooks/use-favorite-click';

type BookmarkButtonProps = {
  offerId: TOffer['id'] | undefined;
  isActive?: boolean;
  classPrefix?: string;
  imageSize?: { width: number; height: number };
};

function BookmarkButtonTemplate({
  offerId,
  isActive = false,
  classPrefix = '',
  imageSize = { width: 18, height: 19 },
}: BookmarkButtonProps) {
  const { handleFavoriteClick } = useFavoriteClick();

  const buttonClassName = classNames('button', {
    [`${classPrefix}__bookmark-button`]: Boolean(classPrefix),
    [`${classPrefix}__bookmark-button--active`]: Boolean(classPrefix) && isActive,
  });

  const favoriteButtonLabel = isActive
    ? 'In bookmarks'
    : 'To bookmarks';

  return (
    <button
      className={buttonClassName}
      type="button"
      onClick={() => handleFavoriteClick(offerId)}
    >
      <svg className={`${classPrefix}__bookmark-icon`} {...imageSize}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">{favoriteButtonLabel}</span>
    </button>
  );
}

const BookmarkButton = memo(BookmarkButtonTemplate);

export default BookmarkButton;
