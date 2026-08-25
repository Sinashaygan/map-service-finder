"use client";

import type { Service } from "@/entities/service/model/types";

interface ServicesListItemProps {
  service: Service;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export function ServicesListItem({
  service,
  isSelected,
  onSelect,
}: ServicesListItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(service.id)}
        aria-pressed={isSelected}
        className={`w-full px-4 py-3 text-left transition-colors hover:bg-muted ${
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
}
