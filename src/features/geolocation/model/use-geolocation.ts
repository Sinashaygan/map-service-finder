import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { GeolocationErrorReason } from "./types";
import { selectGeoState } from "@/store/geolocation-slice";
import { useEffect, useRef } from "react";

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
    const dispatch = useAppDispatch()
    const geo = useAppSelector(selectGeoState)
    const isMountedRef = useRef(true);

    useEffect(() => {
      isMountedRef.current = true;
      return () => {
        isMountedRef.current = false;
      };
    }, []);
}