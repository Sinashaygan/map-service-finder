import { Service } from "@/entities/service/model/types";

const TEHRAN_CENTER: [number, number] = [35.7219, 51.3347];
const DEFAULT_ZOOM = 12;

interface ServiceMapProps {
  services: Service[];
  selectedServiceId: string | null;
  onSelectService: (id: string) => void;
}

export default function ServiceMap({
  services,
  selectedServiceId,
}: Omit<ServiceMapProps, "onSelectService">) {
  return <div>service-map</div>;
}
