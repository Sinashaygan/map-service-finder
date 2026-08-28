<div align="center">

# 🗺️ Tehran Map Service Finder

### Discover, filter, and explore local services on an interactive map.

Built with **Next.js App Router**, **React**, **TypeScript**, **React-Leaflet**, **Redux Toolkit**, **TanStack Query**, and **Supabase**.

<br />

[![Next.js](https://img.shields.io/badge/Next.js-16.3.2-000000?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-61DAFB?style=for-the-badge&logo=react&logoColor=000)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=fff)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9.4-199900?style=for-the-badge&logo=leaflet&logoColor=fff)](https://leafletjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase&logoColor=000)](https://supabase.com/)
[![TanStack Query](https://img.shields.io/badge/TanStack_Query-v5-FF4154?style=for-the-badge&logo=reactquery&logoColor=fff)](https://tanstack.com/query/latest)

<br />

[Features](#-features) ·
[Getting Started](#-getting-started) ·
[Architecture](#-architecture) ·
[Database](#-database) ·
[Deployment](#-deployment)

</div>

---

## ✨ Overview

**Tehran Map Service Finder** is a responsive, map-first web application for finding urban services across Tehran. Users can search services, filter by category or rating, locate themselves, search within a radius, and draw a region on the map to show only services inside that shape.

The map and sidebar list stay synchronized: selecting a service highlights its marker and focuses the map, while selecting a marker highlights the corresponding service in the list.

> The application uses Supabase as its data source and performs distance and drawn-shape filtering in the browser.

## 🌟 Features

### 🗺️ Interactive Map

- Tehran-centered Leaflet map with OpenStreetMap tiles
- Custom category-based service markers
- Marker clustering for dense areas
- Popup details for every service
- Smooth map focus and zoom when a service is selected
- Responsive map/list layout for desktop and mobile

### ✏️ Draw-and-Filter

- Draw polygons or rectangles directly on the map
- Filter services whose coordinates fall inside the drawn shape
- Edit or delete an existing shape
- Clear the active shape filter from the sidebar badge

### 📍 Location & Radius Search

- Browser geolocation with permission and error states
- User location marker and radius visualization
- Adjustable search radius
- Haversine distance calculation for each service
- Optional radius filtering and distance-based sorting

### 🔎 Service Filters

- Debounced name search
- Multi-select service categories:
  - `restaurant`
  - `cafe`
  - `pharmacy`
  - `hospital`
  - `mechanic`
  - `hotel`
  - `coworking`
- Minimum rating filter from `0` to `5`
- Sort by highest rating, name, or distance

### 🔄 Synchronized UI State

- Redux Toolkit manages filters, geolocation, selection, and spatial filter state
- TanStack Query handles Supabase fetching and cached results
- Zod validates Supabase responses at the API boundary
- Map markers and service list remain synchronized
- Selected services automatically scroll into view in the list

## 🛠️ Tech Stack

| Category | Technologies |
| --- | --- |
| Framework | Next.js `16.3.2`, App Router |
| UI | React `19`, Tailwind CSS `4`, shadcn-style components |
| Language | TypeScript |
| Mapping | Leaflet, React-Leaflet, Leaflet Draw, MarkerCluster |
| State Management | Redux Toolkit, React Redux |
| Data Fetching | TanStack Query `v5` |
| Backend | Supabase / PostgreSQL |
| Validation | Zod |
| Icons | Lucide React |

## 🧱 Architecture

The project uses a Feature-Sliced inspired structure under `src/`:

```text
map-service-finder/
├── scripts/
│   └── seed.ts                       # Supabase sample-data seeding
├── src/
│   ├── app/                          # App Router page, layout, providers, styles
│   ├── components/ui/                # Reusable UI primitives
│   ├── entities/service/             # Service types, schema, mapping, UI
│   ├── features/
│   │   ├── geolocation/              # Location permission and radius controls
│   │   ├── service-filters/          # Search, category, rating, and sorting UI
│   │   └── service-finder/           # Map, drawing, list, and finder shell
│   ├── shared/                       # Shared hooks and geographic utilities
│   └── store/                        # Redux store and feature slices
└── public/                           # Static assets
```

### Data Flow

1. `useFilteredServices` builds active query filters and fetches matching rows from Supabase through TanStack Query.
2. Supabase rows are validated with Zod and mapped into the domain `Service` type.
3. `useServicesWithDistance` enriches services with browser-location distance and applies the optional radius filter.
4. `useSpatialFilter` applies the active GeoJSON polygon or rectangle using Turf.
5. The final collection renders in both the sidebar list and the Leaflet map.

## 🗄️ Database

The app expects a Supabase PostgreSQL table named `service` with these fields:

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | Primary key |
| `name` | `text` | Service name |
| `category` | `text` | Supported service category |
| `description` | `text` | Service description |
| `address` | `text` | Tehran address |
| `rating` | `numeric` | Value from `0` to `5` |
| `review_count` | `integer` | Number of reviews |
| `price_level` | `integer` | Value from `1` to `4` |
| `image_url` | `text` | Service image URL |
| `is_open` | `boolean` | Current open status |
| `tags` | `text[]` | Searchable tags |
| `latitude` | `float8` | Latitude |
| `longitude` | `float8` | Longitude |
| `created_at` | `timestamptz` | Creation timestamp |
| `updated_at` | `timestamptz` | Last update timestamp |

## 📦 Getting Started

### Prerequisites

- Node.js 18 or newer
- npm
- A Supabase project with a `service` table

### 1. Clone the repository

```bash
git clone https://github.com/Sinashaygan/map-service-finder.git
cd map-service-finder
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

`SUPABASE_SERVICE_ROLE_KEY` is only required by the seed script. Never expose it in client-side code or prefix it with `NEXT_PUBLIC_`.

### 4. Seed sample services (optional)

```bash
npm run seed
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧪 Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run seed` | Seed Supabase with sample services |

## 🚀 Deployment

The application can be deployed to any Next.js-compatible host, including Vercel:

1. Create a production build with `npm run build`.
2. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the deployment environment.
3. Enable appropriate Supabase Row Level Security policies for the `service` table.
4. Deploy the project.

The service-role key should remain restricted to trusted server-side or local seed environments.

## 🔐 Notes

- Leaflet is loaded dynamically on the client because it depends on browser APIs.
- Browser geolocation requires user permission and generally works only on `localhost` or HTTPS.
- Drawn-shape filtering currently runs client-side with Turf; PostGIS can be added later for large datasets.
- The root route `/` is the application's finder view.

## 🧭 Roadmap

- [ ] Server-side PostGIS spatial queries and indexing
- [ ] Directions and route visualization
- [ ] Service detail pages
- [ ] Reviews and rating submissions
- [ ] Persian localization and RTL support
- [ ] Offline caching and PWA support

## 📄 License

This project is private and intended for development, demonstration, and prototyping unless a separate license is provided.
