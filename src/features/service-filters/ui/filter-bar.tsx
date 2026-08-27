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
import {
  resetFilters,
  setCategories,
  setMinRating,
  setSearch,
  setSortBy,
} from "@/store/filters-slice";
import { ServiceCategory } from "@/entities/service/model/types";
import {
  SERVICE_CATEGORIES,
  SERVICE_SORT_KEYS,
  ServiceSortKey,
} from "@/entities/service/model/filters";
import { LocateMeButton } from "@/features/geolocation/ui/locate-me-button";
import { RadiusControl } from "@/features/geolocation/ui/radius-control";

export function FilterBar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectFilters);
  const activeCount = useAppSelector(selectActiveFilterCount);

  return (
    <div className="space-y-4 p-4">
      <LocateMeButton />
      <RadiusControl />

      <div className="relative">
        <Search
          className="text-muted-foreground pointer-events-none absolute start-3 top-1/2 size-4 -translate-y-1/2"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={filters.search}
          onChange={(event) => dispatch(setSearch(event.target.value))}
          placeholder="Search services"
          aria-label="Search services by name"
          className="ps-9"
        />
      </div>

      <div className="space-y-2">
        <Label>Categories</Label>
        <ToggleGroup
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
          max={5}
          id="min-rating"
          step={0.5}
          value={[filters.minRating]}
          onValueChange={(value) => {
            const minRating = typeof value === "number" ? value : value[0];

            if (minRating !== undefined) {
              dispatch(setMinRating(minRating));
            }
          }}
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
