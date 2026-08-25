"use client";

import dynamic from "next/dynamic";

const ServiceMap = dynamic(() => import("./service-map"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <span className="text-sm text-muted-foreground">Loading map...</span>
    </div>
  ),
});

export default ServiceMap;
