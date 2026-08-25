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
}
