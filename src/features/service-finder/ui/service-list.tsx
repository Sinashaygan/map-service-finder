"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  setHoveredService,
  setSelectedService,
} from "@/store/selection-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useServicesWithDistance } from "../model/use-services-with-distance";
import {ServiceListItem} from "@/entities/service/ui/service-list-item"
import { ServiceListSkeleton } from "@/features/service-filters/ui/service-list-skeleton";

export function ServiceList() {
  const dispatch = useAppDispatch();
  const { services, isPending, isError, error, isRefiltering } =
    useServicesWithDistance();
  const { selectedServiceId, hoveredServiceId } = useAppSelector(
    (state) => state.selection,
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
