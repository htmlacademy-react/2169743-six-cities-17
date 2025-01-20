import { useAppSelector } from '@/shared/hooks/use-app-dispatch';
import Locations from '@/widgets/locations/locations';
import Cities from '@/widgets/cities/cities';
import Spinner from '@/shared/components/spinner/spinner';
import { getCityFilter } from '@/widgets/cities/model/cities.selector';
import { getOffersDataLoading } from '@/entities/Offer/model/offer.selector';

function MainPage() {
  const cityFilter = useAppSelector(getCityFilter);
  const isLoading = useAppSelector(getOffersDataLoading);

  return (
    <>
      <h1 className="visually-hidden">Cities</h1>
      <Locations currentCity={cityFilter} />

      <div style={{ position: 'relative', flexGrow: 1, minHeight: '366px' }}>
        {isLoading ? <Spinner /> : <Cities currentCity={cityFilter} />}
      </div>
    </>
  );
}

export default MainPage;
