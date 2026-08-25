import { rawType } from "../model/schema";
import { Service } from "../model/types";

export function mapServiceToDomain(raw: rawType): Service {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    category: raw.category,
    description: raw.description,
    address: raw.address,
    location: {
      lat: raw.latitude,
      lng: raw.longitude,
    },
    rating: raw.rating,
    reviewCount: raw.review_count,
    priceLevel: raw.price_level,
    imageUrl: raw.image_url,
    isOpen: raw.is_open,
    tags: raw.tags,
    createdAt: raw.created_at,
    updatedAt: raw.updated_at,
  };
}
