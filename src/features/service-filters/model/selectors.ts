import { DEFAULT_SERVICE_FILTERS } from "@/entities/service/model/filters";
import { RootState } from "@/store";
import { createSelector } from "@reduxjs/toolkit";

export const selectFilters = (state: RootState) => state.filters;

export const selectActiveFilterCount = createSelector(
  [selectFilters],
  (filters) => {
    let count = 0;
    if (filters.search.trim() !== "") count += 1;
    if (filters.categories.length > 0) count += 1;
    if (filters.minRating > DEFAULT_SERVICE_FILTERS.minRating) count += 1;
    return count;
  },
);
