import { useFilteredServices } from "@/features/service-finder/model/use-filtered-services";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

export function ServiceList() {
  const { services, isPending, isError, error, isRefiltering } =
    useFilteredServices();

  const selectedServiceId = useSelector(
    (state: RootState) => state.selection.selectedServiceId,
  );
  const hoveredServiceId = useSelector(
    (state: RootState) => state.selection.hoveredServiceId,
  );

  if (isPending) return <ServiceListSkeleto />;

  if (isError) {
    return (
      <p className="text-destructive p-4 text-sm" role="alert">
        {error instanceof Error ? error.message : 'Something went wrong.'}
      </p>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-muted-foreground p-8 text-center text-sm">
        <p className="font-medium">No services match your filters.</p>
        <p className="mt-1">Try widening the rating or clearing categories.</p>
      </div>
    );
  }
}
