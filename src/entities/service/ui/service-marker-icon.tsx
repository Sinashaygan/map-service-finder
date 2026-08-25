// Maps each category to an emoji glyph for the marker.

import { ServiceCategory } from "../model/types";

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