import { useFilteredServices } from "@/features/service-finder/model/use-filtered-services";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { ServiceListSkeleton } from "./service-list-skeleton";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ServicesListItem } from "@/entities/service/ui/service-list-item";
import { setHoveredService, setSelectedService } from "@/store/selection-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectActiveFilterCount, selectFilters } from "../model/selectors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Search, X } from "lucide-react";
import { resetFilters, setCategories, setMinRating, setSearch, setSortBy } from "@/store/filters-slice";
import { ServiceCategory } from "@/entities/service/model/types";
import { SERVICE_CATEGORIES, SERVICE_SORT_KEYS, ServiceSortKey } from "@/entities/service/model/filters";

export function ServiceList() {
  const dispatch = useAppDispatch();
  const { services, isPending, isError, error, isRefiltering } =
    useFilteredServices();

  const selectedServiceId = useSelector(
    (state: RootState) => state.selection.selectedServiceId,
  );
  const hoveredServiceId = useSelector(
    (state: RootState) => state.selection.hoveredServiceId,
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
          <ServicesListItem
            key={service.id}
            service={service}
            isSelected={service.id === selectedServiceId}
            isHovered={service.id === hoveredServiceId}
            onSelect={() => dispatch(setSelectedService(service.id))}
            onHover={(hovered) =>
              dispatch(setHoveredService(hovered ? service.id : null))
            }
          />
        ))}
      </ul>
    </ScrollArea>
  );
}

export function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const activeCount = useAppSelector(selectActiveFilterCount);

  return (
    <div className="space-y-4 p-4">
      <div className="relative">
        <Search
          className="text-muted-foreground pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={filters.search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          placeholder="Search services…"
          aria-label="Search services by name"
          className="ps-9"
        />
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <ToggleGroup
          type="multiple"
          value={filters.categories}
          onValueChange={(value) =>
            dispatch(setCategories(value as ServiceCategory[]))
          }
          className="flex-wrap justify-start gap-2"
          aria-label="Filter by category"
        >
          {SERVICE_CATEGORIES.map((category) => (
            <ToggleGroupItem
              key={category}
              value={category}
              variant="outline"
              size="sm"
              className="capitalize"
            >
              {category}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="min-rating">Minimum rating</Label>
          <span className="text-muted-foreground text-sm tabular-nums">
            {filters.minRating > 0 ? `${filters.minRating.toFixed(1)}+` : "Any"}
          </span>
        </div>
        <Slider
          id="min-rating"
          min={0}
          max={5}
          step={0.5}
          value={[filters.minRating]}
          onValueChange={([value]) => dispatch(setMinRating(value))}
          aria-label="Minimum rating"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort-by">Sort by</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            dispatch(setSortBy(value as ServiceSortKey))
          }
        >
          <SelectTrigger id="sort-by">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {(Object.keys(SERVICE_SORT_KEYS) as ServiceSortKey[]).map((key) => (
              <SelectItem key={key} value={key}>
                {SERVICE_SORT_KEYS[key]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeCount > 0 && (
        <div className="flex items-center justify-between border-t pt-3">
          <Badge variant="secondary">
            {activeCount} filter{activeCount > 1 ? "s" : ""} active
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(resetFilters())}
          >
            <X className="size-4" aria-hidden="true" />
            Clear all
          </Button>
        </div>
      )}
    </div>
  );
}