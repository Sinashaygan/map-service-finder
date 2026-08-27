"use client";

import { useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import type { ServiceWithDistance } from "@/entities/service/model/types";
import { distanceInKm } from "@/shared/lib/geo/distance";
import {
  selectIsRadiusFilterEnabled,
  selectRadiusKm,
  selectUserPosition,
} from "@/store/geolocation-slice";
import { useFilteredServices } from "./use-filtered-services";
import { selectFilters } from "@/features/service-filters/model/selectors";

export function useServicesWithDistance() {
  const query = useFilteredServices();
  const userPosition = useAppSelector(selectUserPosition);
  const radiusKm = useAppSelector(selectRadiusKm);
  const isRadiusFilterEnabled = useAppSelector(selectIsRadiusFilterEnabled);
  const sortBy = useAppSelector(selectFilters).sortBy;

  const services = useMemo<ServiceWithDistance[]>(() => {
    const source = query.data ?? [];
    if (userPosition === null) {
      return source.map((service) => ({ ...service, distanceKm: null }));
    }

    let enriched: ServiceWithDistance[] = source.map((service) => ({
      ...service,
      distanceKm: distanceInKm(userPosition, service.location),
    }));

    if (isRadiusFilterEnabled) {
      enriched = enriched.filter(
        (service) =>
          service.distanceKm !== null && service.distanceKm <= radiusKm,
      );
    }

    if (sortBy === "distance") {
      enriched.sort((a, b) => {
        if (a.distanceKm === null || b.distanceKm === null) return 0;
        return a.distanceKm - b.distanceKm;
      });
    }

    return enriched;
  }, [query.data, userPosition, radiusKm, isRadiusFilterEnabled, sortBy]);

  const sourceCount = query.data?.length ?? 0;
  return {
    ...query,
    services,
    hiddenByRadiusCount:
      userPosition !== null && isRadiusFilterEnabled
        ? Math.max(sourceCount - services.length, 0)
        : 0,
    isDistanceAvailable: userPosition !== null,
  };
}
