import L from "leaflet";
import { ServiceCategory } from "../model/types";

// Maps each category to an emoji glyph for the marker.
// In a later phase this can be swapped for inline SVG icons.
const CATEGORY_GLYPH: Record<ServiceCategory, string> = {
  restaurant: "🍽️",
  cafe: "☕",
  pharmacy: "💊",
  hospital: "🏥",
  mechanic: "🔧",
  hotel: "🏨",
  coworking: "💼",
};

interface MarkerOptions {
  category: ServiceCategory;
  isSelected?: boolean;
}

export function createServiceMarkerIcon({
  category,
  isSelected,
}: MarkerOptions): L.DivIcon {
  const glyph = CATEGORY_GLYPH[category];
  const ring = isSelected
    ? "ring-2 ring-offset-2 ring-blue-500 scale-110"
    : "ring-1 ring-black/10";

  return L.divIcon({
    className: "service-marker", // clears Leaflet's default styles
    html: `
      <div class="flex h-9 w-9 items-center justify-center rounded-full
                  bg-white shadow-md transition-transform ${ring}">
        <span class="text-lg leading-none">${glyph}</span>
      </div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18], // center the icon on the coordinate
    popupAnchor: [0, -18],
  });
}
