"use client";

import { useServices } from "@/features/service-finder/model/use-services";

export default function Home() {
  const { data, isPending, error } = useServices();

  if (isPending) return <p className="p-8">Loading services…</p>;
  if (error) return <p className="p-8 text-red-600">{error.message}</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">{data.length} services loaded</h1>
      <ul className="mt-4 space-y-1 text-sm">
        {data.slice(0, 10).map((s) => (
          <li key={s.id}>
            {s.name} — {s.category} — ⭐ {s.rating} — [{s.location.lat},{" "}
            {s.location.lng}]
          </li>
        ))}
      </ul>
    </main>
  );
}
