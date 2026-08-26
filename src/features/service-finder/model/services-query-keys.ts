import { ServiceFilters } from "@/entities/service/model/filters";

export const serviceKeys = {
  all: ["services"] as const,
  list: (filters: ServiceFilters) =>
    [...serviceKeys.all, "list", filters] as const,
  detail: (id: string) => [...serviceKeys.all, "detail", id] as const,
};

export function escapeLikePattern(input: string): string {
  return input.replace(/[%_]/g, (match) => `\\${match}`);
}
