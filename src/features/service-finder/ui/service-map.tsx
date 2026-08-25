"use client";
import { Service } from "@/entities/service/model/types";
import { useEffect } from "react";
import { useMap } from "react-leaflet";

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