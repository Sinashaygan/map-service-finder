"use client";
import { Service } from "@/entities/service/model/types";
import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap, Popup } from "react-leaflet";
import "@/shared/lib/leaflet-setup";
import { createServiceMarkerIcon } from "@/entities/service/ui/service-marker-icon";

const TEHRAN_CENTER: [number, number] = [35.7219, 51.3347];
const DEFAULT_ZOOM = 12;

interface ServiceMapProps {
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (id: string) => void;
}

function FlyToSelected({
  services,
  selectedServiceId,
}: Omit<ServiceMapProps, "onSelectService">) {
  const map = useMap();

  useEffect(() => {
    if (!selectedServiceId) {
      return;
    }

    const target = services.find((service) => service.id === selectedServiceId);

    if (!target) {
      return;
    }

    map.flyTo([target.location.lat, target.location.lng], 15, {
      duration: 0.8,
    });
  }, [map, services, selectedServiceId]);

  return null;
}

export default function ServiceMap({
  services,
  selectedServiceId,
  onSelectService,
}: ServiceMapProps) {
  return (
    <MapContainer
      center={TEHRAN_CENTER}
      zoom={DEFAULT_ZOOM}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {services.map((service) => (
        <Marker
          key={service.id}
          position={[service.location.lat, service.location.lng]}
          icon={createServiceMarkerIcon({
            category: service.category,
            isSelected: service.id === selectedServiceId,
          })}
          eventHandlers={{
            click: () => onSelectService(service.id),
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

      <FlyToSelected
        services={services}
        selectedServiceId={selectedServiceId}
      />
    </MapContainer>
  );
}
