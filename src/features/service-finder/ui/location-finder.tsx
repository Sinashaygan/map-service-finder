"use client";

import { Circle, CircleMarker, Tooltip } from "react-leaflet";
import { useAppSelector } from "@/store/hooks";
import {
  selectIsRadiusFilterEnabled,
  selectRadiusKm,
  selectUserPosition,
} from "@/store/geolocation-slice";

export function UserLocationLayer() {
  const position = useAppSelector(selectUserPosition);
  const radiusKm = useAppSelector(selectRadiusKm);
  const isRadiusFilterEnabled = useAppSelector(selectIsRadiusFilterEnabled);

  if (!position) return null;

  const center: [number, number] = [position.lat, position.lng];

  return (
    <>
      {isRadiusFilterEnabled && (
        <Circle
          center={center}
          radius={radiusKm * 1000}
          pathOptions={{
            color: "#2563eb",
            weight: 1.5,
            fillColor: "#3b82f6",
            fillOpacity: 0.08,
          }}
          interactive={false}
        />
      )}
      
      <CircleMarker
        center={center}
        radius={7}
        pathOptions={{
          color: "#ffffff",
          weight: 2,
          fillColor: "#2563eb",
          fillOpacity: 1,
        }}
      >
        <Tooltip direction="top">Your Location</Tooltip>
      </CircleMarker>
    </>
  );
}
