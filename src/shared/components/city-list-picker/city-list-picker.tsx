import classNames from 'classnames';
import { CITIES } from '@/shared/constants/cities';

type CityListPickerProps = {
  currentCity: string;
  onClick: (value: string) => void;
};

function CityListPicker({ currentCity, onClick }: CityListPickerProps) {
  const cityItemClassName = (value: CityListPickerProps['currentCity']) => classNames('locations__item-link', 'tabs__item', {
    'tabs__item--active': currentCity.toLowerCase() === value.toLowerCase(),
  });

  return (
    <ul className="locations__list tabs__list">
      {CITIES.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={cityItemClassName(city)}
            href="#"
            onClick={() => onClick(city)}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CityListPicker;
