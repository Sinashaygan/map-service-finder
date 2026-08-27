import { GeolocationErrorReason } from "./types";

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
