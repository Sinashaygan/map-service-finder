"use client";

import type { Service } from "@/entities/service/model/types";

interface ServicesListItemProps {
  service: Service;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function ServicesListItem({
  service,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: ServicesListItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={() => onSelect(service.id)}
        onMouseEnter={() => onHover(service.id)}
        onMouseLeave={() => onHover(null)}
        aria-pressed={isSelected}
        className={`w-full px-4 py-3 text-left transition-colors hover:bg-muted ${
          isSelected ? "bg-muted" : isHovered ? "bg-muted/60" : ""
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
