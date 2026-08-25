declare module "react-leaflet-cluster" {
  import type { LayerGroupProps } from "react-leaflet";
  import type { Icon, Marker, DivIcon } from "leaflet";

  interface MarkerClusterGroupProps extends LayerGroupProps {
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    getChileClusteringAtZoom?: number;
    iconCreateFunction?: (cluster: {
      getChildCount: () => number;
      getAllChildMarkers: () => Marker[];
    }) => Icon | DivIcon;
    polylineOptions?: Record<string, unknown>;
  }

  const MarkerClusterGroup: React.ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
