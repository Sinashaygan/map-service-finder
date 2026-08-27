import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GeolocationErrorReason } from "./types";
import {
  locationFailed,
  locationRequested,
  locationResolved,
  selectGeoState,
} from "@/store/geolocation-slice";
import { useCallback, useEffect, useRef } from "react";

const GEOLOCATION_OPTIONS: PositionOptions = {
  enableHighAccuracy: true,
  timeout: 10_000,
  maximumAge: 60_000,
};

function mapPositionError(
  error: GeolocationPositionError,
): GeolocationErrorReason {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      return "denied";
    case error.POSITION_UNAVAILABLE:
      return "unavailable";
    case error.TIMEOUT:
      return "timeout";
    default:
      return "unsupported";
  }
}

export function useGeolocation() {
  const dispatch = useAppDispatch();
  const geo = useAppSelector(selectGeoState);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const requestLocation = useCallback(() => {
    if (typeof navigator === "undefined" || !("geolocation" in navigator)) {
      dispatch(locationFailed("unsupported"));
      return;
    }

    dispatch(locationRequested());

    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isMountedRef.current) return;

        dispatch(
          locationResolved({
            position: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
            accuracyMeters: position.coords.accuracy,
          }),
        );
      },
      (error) => {
        if (!isMountedRef.current) return;
        dispatch(locationFailed(mapPositionError(error)));
      },
      GEOLOCATION_OPTIONS,
    );
  }, [dispatch]);
}
