import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  DEFAULT_SERVICE_FILTERS,
  type ServiceFilters,
  type ServiceSortKey,
} from "@/entities/service/model/filters";
import type { ServiceCategory } from "@/entities/service/model/types";

const initialState: ServiceFilters = DEFAULT_SERVICE_FILTERS;

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    /** Adds the category if absent, removes it if present. */
    toggleCategory(state, action: PayloadAction<ServiceCategory>) {
      const category = action.payload;
      state.categories = state.categories.includes(category)
        ? state.categories.filter((item) => item !== category)
        : [...state.categories, category];
    },
    setCategories(state, action: PayloadAction<ServiceCategory[]>) {
      state.categories = action.payload;
    },
    setMinRating(state, action: PayloadAction<number>) {
      state.minRating = action.payload;
    },
    setSortBy(state, action: PayloadAction<ServiceSortKey>) {
      state.sortBy = action.payload;
    },
    resetFilters() {
      return DEFAULT_SERVICE_FILTERS;
    },
  },
});

export const {
  setSearch,
  toggleCategory,
  setCategories,
  setMinRating,
  setSortBy,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
