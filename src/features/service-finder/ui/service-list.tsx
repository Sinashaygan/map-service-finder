"use client";

import type { Service } from "@/entities/service/model/types";
import { ServicesListItem } from "@/entities/service/ui/service-list-item";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setHoveredService,
  setSelectedService,
} from "@/store/selection-slice";

interface ServiceListProps {
  services: Service[];
}

export function ServiceList({ services }: ServiceListProps) {
  const dispatch = useAppDispatch();
  const { selectedServiceId, hoveredServiceId } = useAppSelector(
    (state) => state.selection,
  );
  if (services.length === 0) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        No services found.
      </div>
    );
  }

  return (
    <ul className="divide-y">
      {services.map((service) => {
        const isSelected = service.id === selectedServiceId;
        const isHovered = service.id === hoveredServiceId;

        return (
          <ServicesListItem
            service={service}
            isSelected={isSelected}
            isHovered={isHovered}
            key={service.id}
            onSelect={(id) => dispatch(setSelectedService(id))}
            onHover={(id) => dispatch(setHoveredService(id))}
          />
        );
      })}
    </ul>
  );
}
