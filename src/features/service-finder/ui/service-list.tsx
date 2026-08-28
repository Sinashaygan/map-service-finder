"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  setHoveredService,
  setSelectedService,
} from "@/store/selection-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useServicesWithDistance } from "../model/use-services-with-distance";
import { useSpatialFilter } from "../model/use-spatial-filters";
import { ServiceListItem } from "@/entities/service/ui/service-list-item";
import { ServiceListSkeleton } from "@/features/service-filters/ui/service-list-skeleton";
import { useEffect } from "react";

export function ServiceList() {
  const dispatch = useAppDispatch();
  const { services: distanceFilteredServices, isPending, isError, error, isRefiltering } =
    useServicesWithDistance();
  const services = useSpatialFilter(distanceFilteredServices);
  const { selectedServiceId, hoveredServiceId } = useAppSelector(
    (state) => state.selection,
  );

  useEffect(() => {
    if (!selectedServiceId) return;

    const frame = window.requestAnimationFrame(() => {
      const selectedItem = document.querySelector<HTMLElement>(
        `[data-service-id="${CSS.escape(selectedServiceId)}"]`,
      );
      selectedItem?.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [selectedServiceId, services.length]);

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
            serviceId={service.id}
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
