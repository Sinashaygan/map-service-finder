import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { ServiceWithDistance } from "@/entities/service/model/types";
import { cn } from "@/lib/utils";

function formatDistance(distanceKm: number): string {
  return distanceKm < 1
    ? `${Math.round(distanceKm * 1000)} m`
    : `${distanceKm.toFixed(1)} km`;
}
interface ServiceListItemProps {
  service: ServiceWithDistance;
  serviceId?: string;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHoverChange: (hovered: boolean) => void;
}

export function ServiceListItem({
  service,
  serviceId,
  isSelected,
  isHovered,
  onSelect,
  onHoverChange,
}: ServiceListItemProps) {
  return (
    <li data-service-id={serviceId ?? service.id}>
      {/* A real <button> gives us keyboard activation and focus rings for free. */}
      <button
        type="button"
        onClick={onSelect}
        onMouseEnter={() => onHoverChange(true)}
        onMouseLeave={() => onHoverChange(false)}
        onFocus={() => onHoverChange(true)}
        onBlur={() => onHoverChange(false)}
        aria-current={isSelected}
        className="focus-visible:ring-ring w-full rounded-lg text-start focus-visible:ring-2 focus-visible:outline-none"
      >
        <Card
          className={cn(
            "gap-2 p-3 transition-colors",
            isHovered && "bg-accent/50",
            isSelected && "border-primary bg-accent",
          )}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="font-medium leading-tight">{service.name}</span>
            <span className="flex shrink-0 items-center gap-1 text-sm tabular-nums">
              <Star
                className="size-3.5 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
              {service.rating.toFixed(1)}
            </span>
          </div>
          <Badge variant="outline" className="w-fit capitalize">
            {service.category}
          </Badge>
          {service.distanceKm !== null && (
            <span className="text-xs text-muted-foreground">
              {formatDistance(service.distanceKm)}
            </span>
          )}
        </Card>
      </button>
    </li>
  );
}
