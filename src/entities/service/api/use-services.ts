import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/shared/lib/supabase-client";
import { serviceListSchema } from "../model/service.schema";
import { mapServiceToDomain } from "../model/service.mapper";
import { Service } from "../model/service.types";

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
