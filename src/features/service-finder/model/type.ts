import type { Feature, Polygon, MultiPolygon } from "geojson";

export type DrawnShape = Feature<Polygon | MultiPolygon>;

export interface SpatialFilterState {
  drawnShape: DrawnShape | null;
  isShapeFilterEnabled: boolean;
}
