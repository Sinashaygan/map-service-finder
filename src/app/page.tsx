"use client";

import { useServices } from "@/entities/service/api/use-services";

export default function Home() {
  const { data, isLoading, isError, error } = useServices();

  if (isLoading) {
    return <main>Loading services…</main>;
  }

  if (isError) {
    const message = error instanceof Error ? error.message : String(error);
    return <main>{message}</main>;
  }

  return (
    <main>{`${data?.length ?? 0} services loaded`}</main>
  );
}
