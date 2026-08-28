"use client";

import { useEffect, useRef } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";

import { useAppDispatch } from "@/store/hooks";
import type { DrawnShape } from "../model/type";
import { clearDrawnShape, setDrawnShape } from "@/store/spatial-filter-slice";

type CreatedEvent = L.LeafletEvent & {
  layer: L.Layer;
};

type EditedEvent = L.LeafletEvent & {
  layers: L.LayerGroup;
};

export function MapDrawingControl() {
  const map = useMap();
  const dispatch = useAppDispatch();

  const drawnItemsRef = useRef<L.FeatureGroup>(new L.FeatureGroup());

  useEffect(() => {
    const drawnItems = drawnItemsRef.current;

    map.addLayer(drawnItems);

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
      },
      draw: {
        polygon: {
          allowIntersection: false,
          showArea: true,
        },
        rectangle: {},
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
      },
    });

    map.addControl(drawControl);

    const updateShapeInStore = (layer: L.Layer) => {
      if (!(layer instanceof L.Polygon)) {
        return;
      }

      const geoJson = layer.toGeoJSON() as DrawnShape;

      dispatch(setDrawnShape(geoJson));
    };
    
    const handleCreated = (event: L.LeafletEvent) => {
      const { layer } = event as CreatedEvent;
      
      drawnItems.clearLayers();
      dispatch(clearDrawnShape());

      drawnItems.addLayer(layer);
      updateShapeInStore(layer);
    };

    const handleEdited = (event: L.LeafletEvent) => {
      const { layers } = event as EditedEvent;

      layers.eachLayer((layer) => {
        updateShapeInStore(layer);
      });
    };

    const handleDeleted = () => {
      dispatch(clearDrawnShape());
    };

    map.on(L.Draw.Event.CREATED, handleCreated);
    map.on(L.Draw.Event.EDITED, handleEdited);
    map.on(L.Draw.Event.DELETED, handleDeleted);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreated);
      map.off(L.Draw.Event.EDITED, handleEdited);
      map.off(L.Draw.Event.DELETED, handleDeleted);

      map.removeControl(drawControl);
      map.removeLayer(drawnItems);
    };
  }, [map, dispatch]);

  return null;
}
