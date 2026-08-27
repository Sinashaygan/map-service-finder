import { GeolocationState } from "@/features/geolocation/model/types";

export const DEFAULT_RADIUS_KM = 5;
export const MIN_RADIUS_KM = 1;
export const MAX_RADIUS_KM = 30;

interface GeolocationSliceState {
  geo: GeolocationState;
  radiusKm: number;
  isRadiusFilterEnabled: boolean;
}

const initialState: GeolocationSliceState = {
  geo: { state: "idle" },
  radiusKm: DEFAULT_RADIUS_KM,
  isRadiusFilterEnabled: true,
};
