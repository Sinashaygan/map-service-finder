export interface Coordinates {
  lat: number;
  lng: number;
}

export type GeolocationState =
  | { state: "idle" }
  | { state: "requesting" }
  | {
      status: "success";
      position: Coordinates;
      accuracyMeters: number;
      timestamp: number;
    }
  | { status: "error"; reason: GeolocationErrorReason };

export type GeolocationErrorReason =
  | "unsupported"
  | "denied"
  | "unavailable"
  | "timeout";

export const GEOLOCATION_ERROR_MESSAGE: Record<GeolocationErrorReason, string> = {
  unsupported:
    "Your browser does not support geolocation, or the site is not using HTTPS.",
  denied:
    "Location access was denied. Please allow access in your browser settings.",
  unavailable:
    "Your location is currently unavailable. Please check your internet connection or GPS.",
  timeout: "Getting your location took too long. Please try again.",
};
