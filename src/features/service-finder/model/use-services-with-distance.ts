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
  // نتیجهٔ فیلترهای Server-side
  const query = useFilteredServices();
  const userPosition = useAppSelector(selectUserPosition);
  const radiusKm = useAppSelector(selectRadiusKm);
  const isRadiusFilterEnabled = useAppSelector(selectIsRadiusFilterEnabled);
  const sortBy = useAppSelector(selectFilters);

  const services = useMemo<ServiceWithDistance[]>(() => {
    const source = query.data ?? [];

    if (!userPosition) {
      return source.map((service) => ({ ...service, distanceKm: null }));
    }

    let enriched = source.map((service) => ({
      ...service,
      distanceKm: distanceInKm(userPosition, {
        lat: service.location.lat,
        lng: service.location.lng,
      }),
    }));

    if (isRadiusFilterEnabled) {
      enriched = enriched.filter((s) => s.distanceKm! <= radiusKm);
    }

    if (sortBy === "distance") {
      // sort روی آرایهٔ تازه‌ساخته‌شده امن است (mutation کش TanStack Query نیست)
      enriched.sort((a, b) => a.distanceKm! - b.distanceKm!);
    }

    return enriched;
  }, [query.data, userPosition, radiusKm, isRadiusFilterEnabled, sortBy]);

  return {
    ...query,
    services,
    hiddenByRadiusCount: Math.max(
      (query.data?.length ?? 0) - services.length,
      0,
    ),
    isDistanceAvailable: userPosition !== null,
  };
}
