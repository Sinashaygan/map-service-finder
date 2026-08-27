import { Coordinates } from "@/entities/service/model/types";
import {
  GeolocationErrorReason,
  GeolocationState,
} from "@/features/geolocation/model/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

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

const geolocationSlice = createSlice({
  name: "geolocation",
  initialState,
  reducers: {
    locationRequested(state) {
      state.geo = { state: "requesting" };
    },
    locationResolved(
      state,
      action: PayloadAction<{ position: Coordinates; accuracyMeters: number }>,
    ) {
      state.geo = {
        state: "success",
        position: action.payload.position,
        accuracyMeters: action.payload.accuracyMeters,
        timestamp: Date.now(),
      };
    },
    locationFailed(state, action: PayloadAction<GeolocationErrorReason>) {
      state.geo = { state: "error", reason: action.payload };
    },
    locationCleared(state) {
      state.geo = { state: "idle" };
      state.isRadiusFilterEnabled = true;
      state.radiusKm = DEFAULT_RADIUS_KM;
    },
    radiusChanged(state, action: PayloadAction<number>) {
      state.radiusKm = Math.min(
        MAX_RADIUS_KM,
        Math.max(MIN_RADIUS_KM, action.payload),
      );
    },
    radiusFilterToggled(state, action: PayloadAction<boolean>) {
      state.isRadiusFilterEnabled = action.payload;
    },
  },
  selectors: {
    selectGeoState: (state) => state.geo,
    selectRadiusKm: (state) => state.radiusKm,
    selectIsRadiusFilterEnabled: (state) => state.isRadiusFilterEnabled,
    selectUserPosition: (state) =>
      state.geo.state === "success" ? state.geo.position : null,
  },
});

export const {
  locationRequested,
  locationResolved,
  locationFailed,
  locationCleared,
  radiusChanged,
  radiusFilterToggled,
} = geolocationSlice.actions;

export const {
  selectGeoState,
  selectRadiusKm,
  selectIsRadiusFilterEnabled,
  selectUserPosition,
} = geolocationSlice.selectors;

export const geoSlice= geolocationSlice.reducer;