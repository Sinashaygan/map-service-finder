import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Geometry } from "geojson";

type GeoStatus = "idle" | "locating" | "success" | "error" | "denied";

interface GeoState {
  userLocation: { lat: number; lng: number } | null;
  status: GeoStatus;
  drawnGeometry: Geometry | null;
}

const initialState: GeoState = {
  userLocation: null,
  status: "idle",
  drawnGeometry: null,
};

const geoSlice = createSlice({
  name: "geo",
  initialState,
  reducers: {
    setUserLocation(
      state,
      action: PayloadAction<{ lat: number; lng: number }>,
    ) {
      state.userLocation = action.payload;
    },
    setGeoStatus(state, action: PayloadAction<GeoStatus>) {
      state.status = action.payload;
    },
    setDrawnGeometry(state, action: PayloadAction<Geometry>) {
      state.drawnGeometry = action.payload;
    },
    clearDrawnGeometry(state) {
      state.drawnGeometry = null;
    },
  },
});

export const {
  setUserLocation,
  setGeoStatus,
  setDrawnGeometry,
  clearDrawnGeometry,
} = geoSlice.actions;
export default geoSlice.reducer;
