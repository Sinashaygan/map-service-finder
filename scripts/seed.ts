import path from "node:path";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config({
  path: path.resolve(process.cwd(), ".env.local"),
});

const url =
  process.env.SUPABASE_URL ??
  process.env.NEXT_PUBLIC_SUPABASE_URL ??
  process.env.VITE_SUPABASE_URL;

const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error({
    hasUrl: Boolean(url),
    hasServiceRoleKey: Boolean(serviceRoleKey),
  });

  throw new Error("Missing Supabase credentials. Check .env.local.");
}

const db = createClient(url, serviceRoleKey);

/** Real Tehran districts. Points are sampled around these, not uniformly. */
const DISTRICTS = [
  { name: "Tajrish", lat: 35.8046, lng: 51.4341, weight: 3 },
  { name: "Niavaran", lat: 35.8146, lng: 51.4739, weight: 2 },
  { name: "Saadat Abad", lat: 35.7856, lng: 51.372, weight: 3 },
  { name: "Vanak", lat: 35.7594, lng: 51.41, weight: 4 },
  { name: "Shahrak-e Gharb", lat: 35.7614, lng: 51.356, weight: 3 },
  { name: "Yousef Abad", lat: 35.729, lng: 51.403, weight: 3 },
  { name: "Enghelab", lat: 35.701, lng: 51.391, weight: 4 },
  { name: "Valiasr", lat: 35.69, lng: 51.39, weight: 4 },
  { name: "Ferdowsi", lat: 35.698, lng: 51.418, weight: 3 },
  { name: "Narmak", lat: 35.742, lng: 51.505, weight: 2 },
  { name: "Sadeghiyeh", lat: 35.718, lng: 51.32, weight: 2 },
  { name: "Nazi Abad", lat: 35.642, lng: 51.38, weight: 2 },
];

const CATEGORY_CONFIG = {
  restaurant: {
    count: 55,
    prices: [1, 2, 2, 3, 3, 4],
    nouns: [
      "Grill House",
      "Kitchen",
      "Restaurant",
      "Kebab House",
      "Bistro",
      "Eatery",
    ],
    tags: [
      "wifi",
      "outdoor-seating",
      "family-friendly",
      "delivery",
      "kebab",
      "halal",
      "dine-in",
      "reservations",
      "late-night",
    ],
  },
  cafe: {
    count: 45,
    prices: [1, 2, 2, 3],
    nouns: [
      "Coffee Roasters",
      "Cafe",
      "Coffee House",
      "Espresso Bar",
      "Brew Lab",
    ],
    tags: [
      "wifi",
      "specialty-coffee",
      "breakfast",
      "laptop-friendly",
      "dessert",
      "outdoor-seating",
      "brunch",
    ],
  },
  pharmacy: {
    count: 30,
    prices: [1, 1, 2],
    nouns: ["Pharmacy", "Drugstore", "Health Pharmacy"],
    tags: ["24h", "prescription", "cosmetics", "delivery", "insurance"],
  },
  mechanic: {
    count: 22,
    prices: [1, 2, 2, 3],
    nouns: ["Auto Service", "Car Repair", "Motor Works", "Garage"],
    tags: [
      "oil-change",
      "tires",
      "diagnostics",
      "bodywork",
      "towing",
      "european-cars",
    ],
  },
  hotel: {
    count: 18,
    prices: [2, 3, 3, 4],
    nouns: ["Boutique Hotel", "Hotel", "Grand Hotel", "Suites"],
    tags: [
      "wifi",
      "breakfast",
      "parking",
      "gym",
      "airport-shuttle",
      "pet-friendly",
      "city-view",
    ],
  },
  coworking: {
    count: 16,
    prices: [2, 2, 3],
    nouns: ["Coworking Loft", "Workspace", "Coworking Hub", "Studio"],
    tags: [
      "wifi",
      "meeting-rooms",
      "24h-access",
      "printing",
      "parking",
      "phone-booths",
      "events",
    ],
  },
  hospital: {
    count: 14,
    prices: [2, 3, 3, 4],
    nouns: ["Medical Center", "Hospital", "Clinic", "Health Center"],
    tags: [
      "emergency",
      "24h",
      "pediatrics",
      "imaging",
      "laboratory",
      "insurance",
    ],
  },
} as const;

const pick = <T>(arr: readonly T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/** Box-Muller: gaussian scatter looks far more realistic than uniform random. */
function gaussian(mean: number, sigma: number): number {
  const u = 1 - Math.random();
  const v = Math.random();
  return mean + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const weightedDistrict = () => {
  const pool = DISTRICTS.flatMap((d) => Array<typeof d>(d.weight).fill(d));
  return pick(pool);
};

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function pickTags(pool: readonly string[]): string[] {
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2 + Math.floor(Math.random() * 3));
}

function buildRows() {
  const rows: Record<string, unknown>[] = [];
  const usedNames = new Set<string>();

  for (const [category, cfg] of Object.entries(CATEGORY_CONFIG)) {
    for (let i = 0; i < cfg.count; i++) {
      const district = weightedDistrict();

      let name = `${district.name} ${pick(cfg.nouns)}`;
      let suffix = 2;
      while (usedNames.has(name))
        name = `${district.name} ${pick(cfg.nouns)} ${suffix++}`;
      usedNames.add(name);

      // Higher rating correlates with more reviews.
      const rating = Number((3.0 + Math.random() * 2).toFixed(1));
      const reviewCount = Math.max(
        5,
        Math.round(Math.exp(3 + (rating - 3) * 1.4) * (0.5 + Math.random())),
      );

      rows.push({
        name,
        description: `A well-known ${category} in the ${district.name} area of Tehran.`,
        category,
        address: `${district.name}, Tehran`,
        rating: Math.min(rating, 5),
        review_count: reviewCount,
        price_level: pick(cfg.prices),
        image_url: `https://picsum.photos/seed/${slugify(name)}/640/400`,
        is_open: Math.random() < 0.8,
        tags: pickTags(cfg.tags),
        // sigma ≈ 0.012° ≈ 1.3 km — tight enough to form visible clusters.
        latitude: Number(gaussian(district.lat, 0.012).toFixed(6)),
        longitude: Number(gaussian(district.lng, 0.014).toFixed(6)),
      });
    }
  }
  if (rows.length !== 200) {
    throw new Error(
      `Seed configuration generated ${rows.length} rows; expected 200.`,
    );
  }
  return rows;
}

async function main() {
  // A lightweight query confirms that the Supabase project and service table are reachable
  // before any destructive operation is attempted.
  const { error: availabilityError } = await db
    .from("service")
    .select("id", { head: true, count: "exact" })
    .limit(1);
  if (availabilityError) {
    throw new Error(
      `Supabase is unavailable or the service table cannot be read: ${availabilityError.message}`,
    );
  }

  const rows = buildRows();
  console.log(`Generated ${rows.length} rows.`);

  // Replace the current seed data. The service-role key is required here because RLS
  // intentionally permits public reads only.
  const { error: deleteError } = await db
    .from("service")
    .delete()
    .neq("id", "00000000-0000-0000-0000-000000000000");
  if (deleteError) throw deleteError;

  const { error, count } = await db
    .from("service")
    .insert(rows, { count: "exact" });
  if (error) throw error;

  console.log(`Inserted ${count} services.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
