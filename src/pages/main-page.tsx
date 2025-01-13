import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import Locations from '@/widgets/locations/locations';
import Cities from '@/widgets/cities/cities';

function MainPage() {
  const cityFilter = useAppSelector((state) => state.cityFilter);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <Locations currentCity={cityFilter} />
      <Cities currentCity={cityFilter} />
    </>
  );
}

export default MainPage;
