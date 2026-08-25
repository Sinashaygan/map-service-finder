// Fixes the classic Leaflet marker-asset bug with bundlers.
// Leaflet's default icon points to image paths that bundlers rewrite,
// so markers render broken. We re-point them to Leaflet's CDN assets.
// This module must only be imported inside client-only components.
