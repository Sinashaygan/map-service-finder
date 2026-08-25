import { useState } from "react";
import { useServices } from "../model/use-services";

type ViewMode = "map" | "list";

export function FinderShell() {
  const { data: services = [], isPending, isError, error } = useServices();

  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    null,
  );

  const [mobileView, setMobileView] = useState<ViewMode>("map");

  if (isPending) {
    return <div className="p-6">Loading services...</div>;
  }

  if (isError) {
    return <div className="p-6 text-red-600">{error.message}</div>;
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <div className="flex gap-2 border-b p-2 md:hidden">
        <button
          type="button"
          onClick={() => setMobileView("map")}
          aria-pressed={mobileView === "map"}
          className={
            mobileView === "map" ? "font-bold" : "text-muted-foreground"
          }
        >
          Map
        </button>

        <button
          type="button"
          onClick={() => setMobileView("list")}
          aria-pressed={mobileView === "list"}
          className={
            mobileView === "list" ? "font-bold" : "text-muted-foreground"
          }
        >
          List
        </button>
      </div>
    </div>
  );
}
