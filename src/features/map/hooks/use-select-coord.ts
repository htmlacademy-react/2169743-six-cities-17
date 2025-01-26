import { useCallback, useMemo, useState } from 'react';
import type { TOffer, TOfferDetail } from '@/entities/Offer/types';
import { mapPointMapper } from './../utils/map-point-mapper';

function useSelectCoord(
  incomeCoords: Array<TOffer | TOfferDetail>,
  selectedId: TOffer['id'] = '',
) {
  const [activeCoordId, setActiveCoordId] = useState(selectedId);

  const selectedCoord = useMemo(() => {
    const currentCoord = incomeCoords.find((coord) => coord.id === activeCoordId);

    if (!currentCoord) {
      return undefined;
    }

    return mapPointMapper(currentCoord);
  }, [activeCoordId, incomeCoords]);

  const handleMouseEnter = useCallback(
    (id: TOffer['id']) => setActiveCoordId(id),
    [setActiveCoordId],
  );

  const handleMouseLeave = useCallback(
    () => setActiveCoordId(selectedId),
    [selectedId],
  );

  return {
    selectedCoord,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export default useSelectCoord;
