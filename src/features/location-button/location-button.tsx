import { memo, useCallback, type FormEvent } from 'react';
import classNames from 'classnames';

import { setCity } from '@/widgets/cities/model/cities.slice';
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

  const handleLocationButtonClick = useCallback((evt: FormEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
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
