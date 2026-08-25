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
