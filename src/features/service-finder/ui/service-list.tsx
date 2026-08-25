"use client";

import type { Service } from "@/entities/service/model/types";

interface ServiceListProps {
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (id: string) => void;
}

export function ServiceList({
  services,
  selectedServiceId,
  onSelectService,
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

        return (
          <li key={service.id}>
            <button
              type="button"
              onClick={() => onSelectService(service.id)}
              aria-pressed={isSelected}
              className={`w-full px-4 py-3 text-left hover:bg-muted ${
                isSelected ? "bg-muted" : ""
              }`}
            >
              <div className="font-medium">{service.name}</div>

              <div className="text-sm capitalize text-muted-foreground">
                {service.category} · ⭐ {service.rating}
              </div>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
