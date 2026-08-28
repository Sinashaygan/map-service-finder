"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { clearDrawnShape } from "@/store/spatial-filter-slice";
import { X } from "lucide-react";
/**
 * Shows a dismissible badge when a drawn shape filter is active.
 * Rendered inside FinderShell above the ServiceList.
 */
export function SpatialFilterBadge() {
  const { isShapeFilterEnabled } = useAppSelector((state) => state.spatialFilter);
  const dispatch = useAppDispatch();

  if (!isShapeFilterEnabled) return null;

  return (
    <Badge
      variant="secondary"
      className="flex w-fit items-center gap-1.5 text-xs"
    >
      Shape filter active
      <Button
        type="button"
        variant="ghost"
        aria-label="Clear shape filter"
        onClick={() => dispatch(clearDrawnShape())}
        className="ml-0.5 rounded-full p-0.5 hover:bg-muted"
      >
        <X className="h-3 w-3" />
      </Button>
    </Badge>
  );
}
