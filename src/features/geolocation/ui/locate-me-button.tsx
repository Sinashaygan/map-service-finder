"use client";

import { LocateFixed, Loader2, MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGeolocation } from "../model/use-geolocation";
import { GEOLOCATION_ERROR_MESSAGE } from "../model/types";

export function LocateMeButton() {
  const { geo, isRequesting, requestLocation, clearLocation } =
    useGeolocation();

  if (geo.state === "success") {
    return (
      <Button
        variant="outline"
        size="sm"
        onClick={clearLocation}
        className="gap-2"
      >
        <MapPinOff className="size-4" aria-hidden="true" />
        Delete my location
      </Button>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={requestLocation}
        disabled={isRequesting}
        aria-busy={isRequesting}
        className="gap-2"
      >
        {isRequesting ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <LocateFixed className="size-4" aria-hidden="true" />
        )}
        {isRequesting ? "Finding your location..." : "Near me"}
      </Button>

      {geo.state === "error" && (
        <p role="alert" className="text-xs text-destructive">
          {GEOLOCATION_ERROR_MESSAGE[geo.reason]}
        </p>
      )}
    </div>
  );
}
