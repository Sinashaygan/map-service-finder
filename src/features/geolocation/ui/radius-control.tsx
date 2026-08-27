"use client";

import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  MAX_RADIUS_KM,
  MIN_RADIUS_KM,
  radiusChanged,
  radiusFilterToggled,
  selectGeoState,
  selectIsRadiusFilterEnabled,
  selectRadiusKm,
} from "@/store/geolocation-slice";

const faNumber = new Intl.NumberFormat("en");

export function RadiusControl() {
  const dispatch = useAppDispatch();
  const geo = useAppSelector(selectGeoState);
  const radiusKm = useAppSelector(selectRadiusKm);
  const isEnabled = useAppSelector(selectIsRadiusFilterEnabled);

  // Without the user's location, the radius has no meaning
  if (geo.state !== "success") return null;

  return (
    <div className="flex flex-col gap-3 rounded-lg border p-3">
      <div className="flex items-center justify-between">
        <Label htmlFor="radius-slider" className="text-sm">
          Search radius: {faNumber.format(radiusKm)} km
        </Label>
        <Switch
          checked={isEnabled}
          onCheckedChange={(checked) => dispatch(radiusFilterToggled(checked))}
          aria-label="Enable radius filter"
        />
      </div>

      <Slider
        id="radius-slider"
        min={MIN_RADIUS_KM}
        max={MAX_RADIUS_KM}
        step={1}
        value={[radiusKm]}
        onValueChange={(value) => {
          const minRating = typeof value === "number" ? value : value[0];

          if (minRating !== undefined) {
            dispatch(radiusChanged(minRating));
          }
        }}
        disabled={!isEnabled}
        aria-valuetext={`${faNumber.format(radiusKm)} km`}
      />
    </div>
  );
}
