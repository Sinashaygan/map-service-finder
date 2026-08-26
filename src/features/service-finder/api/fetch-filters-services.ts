import {
  DEFAULT_SERVICE_FILTERS,
  ServiceFilters,
} from "@/entities/service/model/filters";
import { Service } from "@/entities/service/model/types";
import { supabase } from "@/shared/lib/supabase-client";
import { escapeLikePattern } from "../model/services-query-keys";
import { serviceSchema } from "@/entities/service/model/schema";
import { mapServiceToDomain } from "@/entities/service/lib/map-service";

export async function fetchServices(
  filters: ServiceFilters = DEFAULT_SERVICE_FILTERS,
): Promise<Service[]> {
  let query = supabase.from("service").select("*");

  const search = filters.search.trim();
  if (search !== "") {
    query = query.ilike("name", `%${escapeLikePattern(search)}%`);
  }

  if (filters.categories.length > 0) {
    query = query.in("category", filters.categories);
  }

  if (filters.minRating > 0) {
    query = query.gte("rating", filters.minRating);
  }

  query =
    filters.sortBy === "rating_desc"
      ? query.order("rating", { ascending: false })
      : query.order("name", { ascending: true });

  const { data, error } = await query;

   if (error) {
     throw new Error(`Failed to fetch services: ${error.message}`);
   }

   return serviceSchema.array().parse(data ?? []).map(mapServiceToDomain)
}
