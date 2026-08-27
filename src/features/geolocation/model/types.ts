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


