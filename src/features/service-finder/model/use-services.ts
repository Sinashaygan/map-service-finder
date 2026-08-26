"use client";

import { useQuery } from "@tanstack/react-query";
import { serviceKeys } from "./services-query-keys";
import { ServiceFilters } from "@/entities/service/model/filters";
import { fetchServices } from "../api/fetch-filters-services";

export function useServices(filters: ServiceFilters) {
  return useQuery({
    queryKey: serviceKeys.list(filters),
    queryFn: () => fetchServices(filters),
    staleTime: 5 * 60 * 1000, // static dataset — no need to refetch aggressively
  });
}
