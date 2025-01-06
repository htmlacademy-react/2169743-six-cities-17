import type { FormEvent } from 'react';
import classNames from 'classnames';

import { setCity } from '@/store/action';
import { useAppDispatch } from '@/shared/hooks/use-app-dispatch';
import { CITIES } from '@/shared/constants/cities';

type LocationsProps = {
  currentCity: string;
};

function Locations({ currentCity }: LocationsProps) {
  const dispatch = useAppDispatch();

  const cityItemClassName = (value: LocationsProps['currentCity']) => classNames('locations__item-link', 'tabs__item', {
    'tabs__item--active': currentCity.toLowerCase() === value.toLowerCase(),
  });

  const handleClick = (city: string, e: FormEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(setCity({ city }));
  };

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <a
                className={cityItemClassName(city)}
                href="#"
                onClick={(e) => handleClick(city, e)}
              >
                <span>{city}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
