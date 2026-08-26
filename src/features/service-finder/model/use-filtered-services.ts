import { ServiceFilters } from "@/entities/service/model/filters";
import { selectFilters } from "@/features/service-filters/model/selectors";
import { useDebouncedValue } from "@/shared/hook/use-debounced-value";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { useServices } from "./use-services";

export function useFilteredServices() {
  const filters = useAppSelector(selectFilters);
  const debouncedSearch = useDebouncedValue(filters.search);

  const queryFilters = useMemo<ServiceFilters>(
    () => ({ ...filters, search: debouncedSearch }),
    [filters, debouncedSearch],
  );

  const query = useServices(queryFilters);

  return {
    ...query,
    services: query.data ?? [],
    /** True while a new filter combination is loading over stale data. */
    isRefiltering: query.isPlaceholderData && query.isFetching,
  };
}
