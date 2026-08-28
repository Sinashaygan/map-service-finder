# tehran-map-services-finder

An interactive, map-driven service finder for Tehran built with Next.js, React-Leaflet, Redux Toolkit, and Supabase. The application allows users to discover, filter, and spatially query urban local services (restaurants, cafes, pharmacies, hospitals, mechanics, hotels, and coworking spaces) across Tehran with real-time browser geolocation, radius proximity search, and bounding box map drawing.

**Repository:** [https://github.com/Sinashaygan/map-service-finder](https://github.com/Sinashaygan/map-service-finder)

---

## Key Features

- **Interactive Tehran Map Interface:** High-performance mapping powered by React-Leaflet and Leaflet with custom category marker icons and dynamic map centering/focus controls.
- **Spatial Filtering & Map Drawing:**
  - Freeform rectangle bounding-box drawing directly on the map to filter services inside a selected geographical region.
  - Spatial filter badge indicators with one-click clear functionality.
- **Browser Geolocation & Proximity:**
  - Browser-based user location detection (`Locate Me`).
  - Adjustable search radius control slider.
  - Real-time Haversine distance calculations from the user position to each service.
- **Multi-faceted Filtering:**
  - Text search (debounced name/address query).
  - Category selector (`restaurant`, `cafe`, `pharmacy`, `hospital`, `mechanic`, `hotel`, `coworking`).
  - Minimum rating threshold slider (0–5).
  - Price level filter (1–4 / `$` to `$$$$`).
  - Open/closed status toggle switch (`is_open`).
- **Synchronized State Management:**
  - Redux Toolkit slices orchestrating filters, geolocation, active selection, and spatial queries.
  - Bidirectional selection sync: clicking an item in the sidebar list highlights/focuses the corresponding map marker, and vice-versa.
- **Data Validation & Type Safety:** Strict runtime schema validation using Zod for backend responses and TypeScript types across the entire codebase.

---

## Tech Stack

- **Framework:** Next.js (App Router) & React
- **Mapping:** Leaflet & React-Leaflet (with `react-leaflet-cluster` support)
- **State Management & Async Data:** Redux Toolkit & React Query / TanStack Query
- **Backend & Database:** Supabase (`@supabase/supabase-js`, PostgreSQL)
- **Schema & Validation:** Zod
- **Styling & UI Components:** Tailwind CSS, Radix UI primitives / Shadcn UI components, Lucide Icons

---

## Architecture & Project Structure

The project follows a modular, Feature-Sliced inspired layout under `src/`:

```
tehran-map-services-finder/
├── scripts/
│   └── seed.ts                     # Database seeding script with realistic Tehran coordinates
├── src/
│   ├── app/                        # Next.js App Router root layout, page, and providers
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── providers.tsx
│   ├── components/ui/              # Reusable UI components (buttons, dialogs, sliders, etc.)
│   ├── entities/
│   │   └── service/                # Service entity definitions, Zod schemas, mapping, & list item UI
│   │       ├── lib/
│   │       ├── model/              # types.ts, schema.ts, filters.ts
│   │       └── ui/                 # service-list-item.tsx, service-marker-icon.tsx
│   ├── features/                   # Encapsulated user capabilities & feature modules
│   │   ├── geolocation/            # Geolocation hook, locate button, radius control
│   │   ├── service-filters/        # Filter bar, selectors, loading skeletons
│   │   └── service-finder/         # Map view, drawing controls, spatial filters, finder shell
│   ├── lib/                        # Utility functions
│   ├── shared/                     # Shared cross-cutting utilities & hooks
│   │   ├── hook/                   # Debounce and helper hooks
│   │   └── lib/                    # Distance calculation, Leaflet setup, Supabase client
│   ├── store/                      # Redux Toolkit store and slices
│   │   ├── filters-slice.ts        # Search text, category, price, rating, open status
│   │   ├── geolocation-slice.ts    # User coordinates & search radius
│   │   ├── selection-slice.ts      # Active/highlighted service ID
│   │   ├── spatial-filter-slice.ts # Bounding box coordinates for map drawing
│   │   ├── hooks.ts                # Typed useDispatch & useSelector hooks
│   │   └── index.ts                # Store configuration
│   └── types/                      # Ambient declarations (e.g. cluster types)
```

---

## Data Flow

1. **Query & Fetching:** `useServices` fetches raw records from the Supabase `service` table.
2. **Runtime Validation & Normalization:** `fetchFiltersServices` validates records against `serviceListSchema` (Zod) and transforms backend rows into clean `Service` entities.
3. **State Integration:** User interactions (filter inputs, category choices, geolocation, map drawing) dispatch actions to Redux slices (`filters`, `geolocation`, `spatialFilter`, `selection`).
4. **Derived Spatial & Filter Pipeline:**
   - `useServicesWithDistance` computes Euclidean/Haversine distance from the user's geolocated position.
   - `useSpatialFilters` subsets services within the active bounding box (if drawn).
   - `useFilteredServices` applies text query, category, price, rating, and open-status filters.
5. **View Synchronization:** The resulting list updates the responsive sidebar list and places interactive Leaflet map markers in sync.

---

## Database Schema (Supabase)

The project expects a PostgreSQL table named `service` in Supabase with the following schema:

| Column | Type | Constraints / Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary Key (e.g., `gen_random_uuid()`) |
| `name` | `text` | Required service name |
| `category` | `text` | One of: `restaurant`, `cafe`, `pharmacy`, `hospital`, `mechanic`, `hotel`, `coworking` |
| `description` | `text` | Service description |
| `address` | `text` | Physical address in Tehran |
| `rating` | `numeric` / `float8` | Decimal rating between `0.0` and `5.0` |
| `review_count` | `integer` | Non-negative integer |
| `price_level` | `integer` | Value between `1` and `4` (`$` to `$$$$`) |
| `image_url` | `text` | Valid image URL |
| `is_open` | `boolean` | Current open/operating status |
| `tags` | `text[]` / `jsonb` | Array of descriptive tag strings |
| `latitude` | `float8` | Latitude coordinate (e.g. `35.6892` Tehran range) |
| `longitude` | `float8` | Longitude coordinate (e.g. `51.3890` Tehran range) |
| `created_at` | `timestamptz` | Record creation timestamp |
| `updated_at` | `timestamptz` | Record last update timestamp |

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm, yarn, or pnpm
- A Supabase project instance

### Environment Configuration

Create a `.env.local` file in the root directory:

```env
# Client-side variables (used by Next.js app in the browser)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Server-only / Seeding credentials (NEVER expose to client-side bundles)
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

> **Security Warning:** `SUPABASE_SERVICE_ROLE_KEY` bypasses PostgreSQL Row-Level Security (RLS). It must only be used in trusted server-side scripts (such as `scripts/seed.ts`) and must **never** be prefixed with `NEXT_PUBLIC_` or shared in client bundles.

### Installation & Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Sinashaygan/map-service-finder.git
   cd map-service-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seeding Tehran Sample Data

The repository includes a seeding script (`scripts/seed.ts`) that populates Supabase with realistic services concentrated across key Tehran districts (Tajrish, Niavaran, Saadat Abad, Vanak, Shahrak-e Gharb, etc.).

Example execution using a TypeScript runner (adjust according to the scripts configured in your `package.json`):

```bash
# Example using ts-node or npx tsx
npx tsx scripts/seed.ts
```

> *Note: Seeding requires `SUPABASE_SERVICE_ROLE_KEY` and `NEXT_PUBLIC_SUPABASE_URL` to be present in `.env.local`.*

---

## Development Notes & Considerations

- **Leaflet CSS & SSR:** Leaflet depends on window objects not present in server-side Node.js environments. The map components use dynamic client-side loading (`service-map-loader.tsx`) and require the Leaflet stylesheet (`leaflet/dist/leaflet.css`) imported in `globals.css` or layout.
- **Browser Geolocation Permissions:** The "Locate Me" feature requires the user's browser permission for the Geolocation API. In development and production, this API is typically restricted to secure contexts (`https://` or `localhost`).
- **Snapshot Notice:** Note that `package.json` and SQL migration files were not included in the source snapshot provided with this distribution; check the exact package scripts and database policies against the live repository before production deployment.

---

## Accessibility & Security Notes

- **Input Accessibility:** Accessible form controls, sliders, and buttons built on top of Radix UI primitives.
- **Key Safety:** Client operations use only the read-restricted Supabase anonymous key with Row-Level Security enabled. The administrative service-role key is kept strictly isolated to offline seeding scripts.
- **Runtime Validation:** All external data fetched from Supabase is validated through Zod before entering the UI layer to prevent runtime crashes caused by malformed database records.

---

## Roadmap & Future Enhancements

- [ ] Interactive route and directions calculation from user location to selected service.
- [ ] PostGIS spatial queries on the Supabase backend for native GeoJSON spatial indexing.
- [ ] User review and rating submission forms.
- [ ] Multi-language support (Persian / Farsi localization and RTL layout optimization).
- [ ] Offline caching and Progressive Web App (PWA) capabilities.
