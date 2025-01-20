import { useEffect, useState, type MutableRefObject, useRef } from 'react';
import { Map, TileLayer, type MapOptions } from 'leaflet';
import type { City } from '@/features/map/types';

function useMap(
  mapRef: MutableRefObject<HTMLElement | null>,
  city: City,
  options: MapOptions = {},
) {
  const [map, setMap] = useState<Map | null>(null);
  const isRenderedRef = useRef<boolean>(false);

  useEffect(() => {
    if (map) {
      map.panTo({
        lat: city.latitude,
        lng: city.longitude,
      });
    }
  }, [city, map]);

  useEffect(() => {
    if (mapRef.current !== null && !isRenderedRef.current) {
      const instance = new Map(mapRef.current, {
        center: {
          lat: city.latitude,
          lng: city.longitude,
        },
        zoom: 10,
        ...options,
      });

      const layer = new TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      });

      instance.addLayer(layer);
      setMap(instance);
      isRenderedRef.current = true;
    }
  }, [mapRef, city, options]);

  return map;
}
export default useMap;
