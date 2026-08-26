import { useFilteredServices } from "@/features/service-finder/model/use-filtered-services";

export function ServiceList() {
  const { services, isPending, isError, error, isRefiltering } =
    useFilteredServices();
}
