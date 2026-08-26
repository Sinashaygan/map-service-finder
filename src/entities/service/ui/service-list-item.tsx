"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
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
    <li className="p-2">
      <Card
        size="sm"
        className={cn(
          "transition-colors",
          isSelected && "bg-muted ring-2 ring-ring",
          isHovered && !isSelected && "bg-muted/60",
        )}
      >
        <CardContent className="p-0">
          <Button
            variant="ghost"
            className="h-auto w-full justify-start rounded-xl px-3 py-3 text-left"
            onClick={() => onSelect(service.id)}
            onMouseEnter={() => onHover(service.id)}
            onMouseLeave={() => onHover(null)}
            aria-pressed={isSelected}
          >
            <span className="min-w-0 space-y-1">
              <span className="block truncate font-medium">{service.name}</span>
              <span className="flex items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">{service.category}</Badge>
                <span aria-label={`Rating ${service.rating} out of 5`}>
                  ★ {service.rating}
                </span>
              </span>
            </span>
          </Button>
        </CardContent>
      </Card>
    </li>
  );
}
