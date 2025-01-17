import { memo, useCallback, type FormEvent } from 'react';
import classNames from 'classnames';

import { setCity } from '@/store/action';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';

type LocationButtonProps = {
  city: string;
  isActive: boolean;
};

function LocationButtonTemplate({ city, isActive }: LocationButtonProps) {
  const dispatch = useAppDispatch();

  const cityItemClassName = classNames('locations__item-link', 'tabs__item', {
    'tabs__item--active': isActive,
  });

  const handleLocationButtonClick = useCallback((e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(setCity({ city }));
  }, [city, dispatch]);

  return (
    <a
      className={cityItemClassName}
      href="#"
      onClick={handleLocationButtonClick}
    >
      <span>{city}</span>
    </a>
  );
}

const LocationButton = memo(LocationButtonTemplate);

export default LocationButton;
