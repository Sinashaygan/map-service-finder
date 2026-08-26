import { ServiceCategory } from "./types";

export interface ServiceFilters {
  search: string;
  categories: ServiceCategory[];
  minRating: number;
  sortBy: ServiceSortKey;
}

export const SERVICE_SORT_KEYS = ["rating_desc", "name_asc"] as const;

export type ServiceSortKey = (typeof SERVICE_SORT_KEYS)[number];

export const DEFAULT_SERVICE_FILTERS: ServiceFilters = {
  search: "",
  categories: [],
  minRating: 0,
  sortBy: "rating_desc",
};