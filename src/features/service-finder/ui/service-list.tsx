"use client";

import { useDispatch, useSelector } from "react-redux";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  setHoveredService,
  setSelectedService,
} from "@/store/selection-slice";
import type { RootState } from "@/store";
import { useFilteredServices } from "../model/use-filtered-services";
import {ServiceListItem} from "@/entities/service/ui/service-list-item"
import { ServiceListSkeleton } from "@/features/service-filters/ui/service-list-skeleton";

export function ServiceList() {
  const dispatch = useDispatch();
  const { services, isPending, isError, error, isRefiltering } =
    useFilteredServices();
  const selectedServiceId = useSelector(
    (state: RootState) => state.selection.selectedServiceId,
  );
  const hoveredServiceId = useSelector(
    (state: RootState) => state.selection.hoveredServiceId,
  );

  if (isPending) return <ServiceListSkeleton />;

  if (isError) {
    return (
      <p className="text-destructive p-4 text-sm" role="alert">
        {error instanceof Error ? error.message : "Something went wrong."}
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

  return (
    <ScrollArea className="h-full">
      <ul
        className={cn(
          "space-y-2 p-3 transition-opacity",
          isRefiltering && "opacity-60",
        )}
        aria-busy={isRefiltering}
      >
        {services.map((service) => (
          <ServiceListItem
            key={service.id}
            service={service}
            isSelected={service.id === selectedServiceId}
            isHovered={service.id === hoveredServiceId}
            onSelect={() => dispatch(setSelectedService(service.id))}
            onHoverChange={(hovered) =>
              dispatch(setHoveredService(hovered ? service.id : null))
            }
          />
        ))}
      </ul>
    </ScrollArea>
  );
}
