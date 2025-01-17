import { useMemo } from 'react';
import LocationButton from '@/features/location-button/location-button';
import { CITIES } from '@/shared/constants/cities';

type LocationsProps = {
  currentCity: string;
};

function Locations({ currentCity }: LocationsProps) {
  const checkActive = useMemo(
    () => (city: string) => currentCity.toLowerCase() === city.toLowerCase(),
    [currentCity],
  );

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {CITIES.map((city) => (
            <li key={city} className="locations__item">
              <LocationButton city={city} isActive={checkActive(city)} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Locations;
