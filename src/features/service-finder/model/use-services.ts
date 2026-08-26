"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { serviceKeys } from "./services-query-keys";
import { DEFAULT_SERVICE_FILTERS, ServiceFilters } from "@/entities/service/model/filters";
import { fetchServices } from "../api/fetch-filters-services";

export function useServices(filters: ServiceFilters = DEFAULT_SERVICE_FILTERS) {
  return useQuery({
    queryKey: serviceKeys.list(filters),
    queryFn: () => fetchServices(filters),
    staleTime: 5 * 60 * 1000, // static dataset — no need to refetch aggressively
    placeholderData: keepPreviousData,
  });
}
