"use client";

import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/get-services";
import { serviceKeys } from "./services-query-keys";

export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: getServices,
    staleTime: 5 * 60 * 1000, // static dataset — no need to refetch aggressively
  });
}
