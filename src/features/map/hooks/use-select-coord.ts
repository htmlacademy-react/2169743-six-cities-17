import { useCallback, useMemo } from 'react';
import type { TOffer, TOfferDetail } from '@/entities/Offer/types';
import { mapPointMapper } from './../utils/map-point-mapper';
import { useAppDispatch, useAppSelector } from '@/shared/hooks/use-app-dispatch';
import { getSelectedOfferId } from '../model/map.selector';
import { setSelectedOfferId } from '../model/map.slice';

function useSelectCoord(
  incomeCoords: Array<TOffer | TOfferDetail>,
  selectedId: TOffer['id'] = '',
) {
  const dispatch = useAppDispatch();
  const activeCoordId = useAppSelector(getSelectedOfferId);

  const selectedCoord = useMemo(() => {
    const currentCoord = incomeCoords.find((coord) => coord.id === activeCoordId);

    if (!currentCoord) {
      return undefined;
    }

    return mapPointMapper(currentCoord);
  }, [activeCoordId, incomeCoords]);

  const handleMouseEnter = useCallback(
    (id: TOffer['id']) => dispatch(setSelectedOfferId(id)),
    [dispatch],
  );

  const handleMouseLeave = useCallback(
    () => dispatch(setSelectedOfferId(selectedId)),
    [dispatch, selectedId],
  );

  return {
    selectedCoord,
    handleMouseEnter,
    handleMouseLeave,
  };
}

export default useSelectCoord;
