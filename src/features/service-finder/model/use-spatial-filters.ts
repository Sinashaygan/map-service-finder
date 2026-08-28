import { useMemo } from "react";
import * as turf from "@turf/turf";
import { ServiceWithDistance } from "@/entities/service/model/types";
import { useAppSelector } from "@/store/hooks";

/**
 * Given a list of services and the current drawn shape,
 * returns only services whose coordinates fall inside the shape.
 * When no shape is active, all services pass through unchanged.
 */
export function useSpatialFilter(
  services: ServiceWithDistance[],
): ServiceWithDistance[] {
  const { drawnShape, isShapeFilterEnabled } = useAppSelector(
    (state) => state.spatialFilter,
  );

  return useMemo(() => {
    if (!isShapeFilterEnabled || drawnShape === null) return services;

    return services.filter((service) => {
      const point = turf.point([service.location.lng, service.location.lat]);
      return turf.booleanPointInPolygon(point, drawnShape);
    });
  }, [services, drawnShape, isShapeFilterEnabled]);
}
