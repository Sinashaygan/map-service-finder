// Fixes the classic Leaflet marker-asset bug with bundlers.
// Leaflet's default icon points to image paths that bundlers rewrite,
// so markers render broken. We re-point them to Leaflet's CDN assets.
// This module must only be imported inside client-only components.

import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Prevent Leaflet from guessing the (now-wrong) asset URLs.
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })
  ._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});