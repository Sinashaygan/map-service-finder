import { Skeleton } from "@/components/ui/skeleton";

export function ServiceListSkeleton() {
  return (
    <div className="space-y-2 p-3" aria-hidden="true">
      {Array.from({ length: 6 }).map((_, index) => (
        <Skeleton key={index} className="h-20 w-full rounded-lg" />
      ))}
    </div>
  );
}
