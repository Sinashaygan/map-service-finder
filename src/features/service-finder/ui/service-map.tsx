"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "@/shared/lib/leaflet-setup";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  setHoveredService,
  setSelectedService,
} from "@/store/selection-slice";
import { useServices } from "../model/use-services";
import { createServiceMarkerIcon } from "@/entities/service/ui/service-marker-icon";

const TEHRAN_CENTER: [number, number] = [35.7219, 51.3347];
const DEFAULT_ZOOM = 12;
const MAX_CLUSTER_ZOOM = 16;

function FlyToSelected() {
  const map = useMap();
  const selectedServiceId = useAppSelector(
    (state) => state.selection.selectedServiceId,
  );
  const { data: services } = useServices();

  useEffect(() => {
    if (!selectedServiceId) return;
    const target = (services ?? []).find((s) => s.id === selectedServiceId);
    if (target) {
      map.flyTo([target.location.lat, target.location.lng], 15, {
        duration: 0.8,
      });
    }
  }, [map, services, selectedServiceId]);

  return null;
}

export default function ServiceMap() {
  const dispatch = useAppDispatch();
  const { data: services = [] } = useServices();
  const { selectedServiceId, hoveredServiceId } = useAppSelector(
    (state) => state.selection,
  );

  return (
    <MapContainer
      center={TEHRAN_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup
        maxClusterRadius={60}
        disableClusteringAtZoom={MAX_CLUSTER_ZOOM}
        showCoverageOnHover={false}
        spiderfyOnMaxZoom
      >
        {services.map((service) => (
          <Marker
            key={service.id}
            position={[service.location.lat, service.location.lng]}
            icon={createServiceMarkerIcon({
              category: service.category,
              isSelected: service.id === selectedServiceId,
              isHovered: service.id === hoveredServiceId,
            })}
            eventHandlers={{
              click: () => dispatch(setSelectedService(service.id)),
              mouseover: () => dispatch(setHoveredService(service.id)),
              mouseout: () => dispatch(setHoveredService(null)),
            }}
          >
            <Popup>
              <strong>{service.name}</strong>
              <br />
              <span className="capitalize">{service.category}</span> · ⭐{" "}
              {service.rating}
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>

      <FlyToSelected />
    </MapContainer>
  );
}
