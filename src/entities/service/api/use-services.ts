import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase-client";
import { serviceListSchema } from "../model/schema";
import { mapServiceToDomain } from "../lib/map-service";
import { Service } from "../model/types";

export async function fetchServices(): Promise<Service[]> {
  const { data, error } = await supabase.from("service").select("*");

  if (error) throw error;

  const parsed = serviceListSchema.parse(data);
  return parsed.map(mapServiceToDomain);
}

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: fetchServices,
    staleTime: 5 * 60 * 1000,
  });
}
