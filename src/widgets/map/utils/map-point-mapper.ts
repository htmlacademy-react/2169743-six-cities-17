import type { TOffer } from '@/entities/Offers/types';
import type { Point } from '@/widgets/map/types';

function mapPointMapper({ title, location }: TOffer): Point {
  return {
    title,
    latitude: location.latitude,
    longitude: location.longitude,
  };
}

export default mapPointMapper;
