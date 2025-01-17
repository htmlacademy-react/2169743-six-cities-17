import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import Locations from '@/widgets/locations/locations';
import Cities from '@/widgets/cities/cities';
import Spinner from '@/shared/components/spinner/spinner';

function MainPage() {
  const cityFilter = useAppSelector((state) => state.cityFilter);
  const isLoading = useAppSelector((state) => state.isOffersDataLoading);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <Locations currentCity={cityFilter} />

      <div style={{ position: 'relative', minHeight: '366px' }}>
        {isLoading ? <Spinner /> : <Cities currentCity={cityFilter} />}
      </div>
    </>
  );
}

export default MainPage;
