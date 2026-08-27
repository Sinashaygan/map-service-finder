"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import { useAppSelector } from "@/store/hooks";
import { selectRadiusKm, selectUserPosition } from "@/store/geolocation-slice";

/**
 * add a controller tha prevent re rendering between declarative and imperative api like leaflet
 */
export function MapFocusController() {
  const map = useMap();
  const position = useAppSelector(selectUserPosition);
  const radiusKm = useAppSelector(selectRadiusKm);
  const lastFocusedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!position) {
      lastFocusedRef.current = null;
      return;
    }

    const key = `${position.lat},${position.lng}`;
    if (lastFocusedRef.current === key) return;
    lastFocusedRef.current = key;

    map.flyTo([position.lat, position.lng], zoomForRadius(radiusKm), {
      duration: 0.8,
    });
  }, [map, position, radiusKm]);

  return null;
}

function zoomForRadius(radiusKm: number): number {
  if (radiusKm <= 2) return 14;
  if (radiusKm <= 5) return 13;
  if (radiusKm <= 15) return 12;
  return 11;
}
