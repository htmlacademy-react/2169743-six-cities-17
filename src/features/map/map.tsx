import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import useMap from '@/features/map/hooks/use-map';
import type { City, Point, Points } from '@/features/map/types';

import URL_MARKER_DEFAULT from '/img/pin.svg';
import URL_MARKER_CURRENT from '/img/pin-active.svg';

type MapProps = {
  city: City;
  points: Points;
  selectedPoint: Point | undefined;
  isAcceptZoom?: boolean;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({
  city,
  points,
  selectedPoint,
  isAcceptZoom = true,
}: MapProps) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city, {
    zoomControl: isAcceptZoom,
    scrollWheelZoom: isAcceptZoom,
  });

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({
          lat: point.latitude,
          lng: point.longitude,
        });

        marker
          .setIcon(
            selectedPoint !== undefined && point.id === selectedPoint.id
              ? currentCustomIcon
              : defaultCustomIcon,
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return <div style={{ height: '500px' }} ref={mapRef} />;
}
export default Map;
