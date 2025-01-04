import { useState } from 'react';
import classNames from 'classnames';

import type { TSortSelectOption } from './../../types';
import { SORT_SELECT_PARAMS } from './../../constants/sort-select-options';

type OffersSortSelectProps = {
  sortValue: TSortSelectOption['id'];
  onSelect: (id: TSortSelectOption['id']) => void;
}

function OffersSortSelect({ sortValue, onSelect }: OffersSortSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen((prev) => !prev);

  const selectLabel = SORT_SELECT_PARAMS.find(({ id }) => sortValue === id)!.value;

  const listClassName = classNames('places__options', 'places__options--custom', {
    'places__options--opened': isOpen,
  });

  const itemClassName = (id: TSortSelectOption['id']) => classNames('places__option', {
    'places__option--active': sortValue === id,
  });

  const handleSelect = (id: TSortSelectOption['id']) => {
    onSelect(id);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting">
      <span className="places__sorting-caption">Sort by&nbsp;&nbsp;</span>

      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggle}
      >
        {selectLabel}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>

      <ul className={listClassName}>
        {SORT_SELECT_PARAMS.map(({ id, value }) => (
          <li
            className={itemClassName(id)}
            key={id}
            onClick={() => handleSelect(id)}
          >
            {value}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default OffersSortSelect;
