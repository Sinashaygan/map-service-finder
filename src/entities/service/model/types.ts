export type ServiceCategory =
  | "restaurant"
  | "cafe"
  | "pharmacy"
  | "hospital"
  | "mechanic"
  | "hotel"
  | "coworking";

export type PriceLevel = 1 | 2 | 3 | 4;

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  category: ServiceCategory;
  description: string;
  address: string;
  location: Coordinates;
  rating: number;
  reviewCount: number;
  priceLevel: PriceLevel;
  imageUrl: string;
  isOpen: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}