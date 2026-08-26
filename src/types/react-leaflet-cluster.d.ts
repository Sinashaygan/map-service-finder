declare module "react-leaflet-cluster" {
  import type { ComponentType } from "react";
  import type { LayerGroupProps } from "react-leaflet";
  import type { DivIcon, Icon, Marker } from "leaflet";

  interface MarkerClusterGroupProps extends LayerGroupProps {
    maxClusterRadius?: number;
    spiderfyOnMaxZoom?: boolean;
    showCoverageOnHover?: boolean;
    zoomToBoundsOnClick?: boolean;
    disableClusteringAtZoom?: number;
    iconCreateFunction?: (cluster: {
      getChildCount: () => number;
      getAllChildMarkers: () => Marker[];
    }) => Icon | DivIcon;
    polylineOptions?: Record<string, unknown>;
  }

  const MarkerClusterGroup: ComponentType<MarkerClusterGroupProps>;
  export default MarkerClusterGroup;
}
