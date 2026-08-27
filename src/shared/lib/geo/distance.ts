import { Coordinates } from "@/entities/service/model/types";
import distance from "@turf/distance";
import { point } from "@turf/helpers";

export function distanceInKm(from: Coordinates, to: Coordinates) {
  return distance(point([from.lng, from.lat]), point([to.lng, to.lat]), {
    units: "kilometers",
  });
}

export function isWithinRadius(
  center: Coordinates,
  target: Coordinates,
  radiusKm: number,
): boolean {
  return distanceInKm(center, target) <= radiusKm;
}