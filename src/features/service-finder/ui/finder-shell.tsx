"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices } from "../model/use-services";
import ServiceMap from "./service-map-loader";
import { ServiceList } from "./service-list";

type ViewMode = "map" | "list";

export function FinderShell() {
  const { data: services = [], isPending, isError, error } = useServices();

  const [mobileView, setMobileView] = useState<ViewMode>("map");

  if (isPending) {
    return (
      <div className="space-y-4 p-6" aria-busy="true" aria-label="Loading services">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-24 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="m-6" role="alert">
        <CardContent className="pt-6 text-destructive">
          Unable to load services: {error.message}
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex gap-2 border-b p-2 md:hidden" role="group" aria-label="Map or list view">
        <Button
          variant={mobileView === "map" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setMobileView("map")}
          aria-pressed={mobileView === "map"}
        >
          Map
        </Button>

        <Button
          variant={mobileView === "list" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => setMobileView("list")}
          aria-pressed={mobileView === "list"}
        >
          List
        </Button>
      </div>

      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside
          className={`w-full overflow-y-auto border-r md:block md:w-96 ${
            mobileView === "list" ? "block" : "hidden"
          }`}
        >
          <ServiceList
            services={services}
          />
        </aside>

        <main
          className={`min-h-0 flex-1 ${
            mobileView === "map" ? "block" : "hidden"
          } md:block`}
        >
          <ServiceMap services={services} />
        </main>
      </div>
    </div>
  );
}
