import { supabase } from "@/shared/lib/supabase-client";
import { serviceListSchema } from "@/entities/service/model/schema";
import type { Service } from "@/entities/service/model/types";
import { mapServiceToDomain } from "@/entities/service/lib/map-service";

export async function getServices(): Promise<Service[]> {
  const { data, error } = await supabase
    .from("service")
    .select("*")
    .order("rating", { ascending: false });

  if (error) throw new Error(error.message);

  // Validate at the boundary, then map into the domain shape.
  return serviceListSchema.parse(data).map(mapServiceToDomain);
}
