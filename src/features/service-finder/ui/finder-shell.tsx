"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { SlidersHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { FilterBar } from "@/features/service-filters/ui/filter-bar";
import { selectActiveFilterCount } from "@/features/service-filters/model/selectors";
import { cn } from "@/lib/utils";
import { ServiceList } from "./service-list";
import ServiceMap from "./service-map-loader";
import { useFilteredServices } from "../model/use-filtered-services";
import { useSelectionSync } from "../model/use-selection-sync";

type ViewMode = "map" | "list";

export function FinderShell() {
  const [mobileView, setMobileView] = useState<ViewMode>("map");
  const { services, isPending } = useFilteredServices();
  const activeCount = useSelector(selectActiveFilterCount);

  useSelectionSync(services, isPending);

  return (
    <div className="flex h-[calc(100dvh-4rem)] flex-col">
      {/* Mobile toolbar: view switch + filters in a sheet */}
      <div className="flex items-center gap-2 border-b p-2 md:hidden">
        <ToggleGroup
          multiple={false}
          value={[mobileView]}
          onValueChange={(value) => {
            const nextView = value[0];
            if (nextView === "map" || nextView === "list") {
              setMobileView(nextView);
            }
          }}
          variant="outline"
          size="sm"
          aria-label="Switch between map and list"
        >
          <ToggleGroupItem value="map">Map</ToggleGroupItem>
          <ToggleGroupItem value="list">List</ToggleGroupItem>
        </ToggleGroup>

        <Sheet>
          <SheetTrigger
            render={
              <Button variant="outline" size="sm" className="ms-auto">
                <SlidersHorizontal className="size-4" aria-hidden="true" />
                Filters
                {activeCount > 0 && (
                  <Badge variant="secondary" className="ms-1">
                    {activeCount}
                  </Badge>
                )}
              </Button>
            }
          />
          <SheetContent side="bottom" className="max-h-[85dvh] overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
              <SheetDescription>
                Narrow down services by name, category, and rating.
              </SheetDescription>
            </SheetHeader>
            <FilterBar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={cn(
            "w-full flex-col overflow-hidden border-e md:flex md:w-96",
            mobileView === "list" ? "flex" : "hidden",
          )}
        >
          {/* Desktop keeps filters inline; mobile gets them via the sheet. */}
          <div className="hidden border-b md:block">
            <FilterBar />
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            <ServiceList />
          </div>
        </aside>

        <main
          className={cn(
            "flex-1",
            mobileView === "map" ? "block" : "hidden md:block",
          )}
        >
          <ServiceMap services={services} />
        </main>
      </div>
    </div>
  );
}
