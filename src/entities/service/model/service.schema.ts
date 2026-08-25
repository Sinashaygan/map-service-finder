import { z } from "zod";
export const serviceSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  slug: z.string(),
  category: z.enum([
    "restaurant",
    "cafe",
    "pharmacy",
    "hospital",
    "mechanic",
    "hotel",
    "coworking",
  ]),
  description: z.string(),
  address: z.string(),
  rating: z.number().min(0).max(5),
  review_count: z.number().int().nonnegative(),
  price_level: z.union([
    z.literal(1),
    z.literal(2),
    z.literal(3),
    z.literal(4),
  ]),
  image_url: z.string().url(),
  is_open: z.boolean(),
  tags: z.array(z.string()),
  latitude: z.number(),
  longitude: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const serviceListSchema = z.array(serviceSchema);
export type rawType = z.infer<typeof serviceSchema>;
