"use client";

import type { Service } from "@/entities/service/model/types";
import { ServicesListItem } from "@/entities/service/ui/service-list-item";

interface ServiceListProps {
  services: Service[];
  selectedServiceId: string | null;
  hoveredServiceId: string | null;
  onSelectService: (id: string) => void;
  onHoverService: (id: string | null) => void;
}

export function ServiceList({
  services,
  selectedServiceId,
  hoveredServiceId,
  onSelectService,
  onHoverService,
}: ServiceListProps) {
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
            onSelect={onSelectService}
            onHover={onHoverService}
          />
        );
      })}
    </ul>
  );
}
