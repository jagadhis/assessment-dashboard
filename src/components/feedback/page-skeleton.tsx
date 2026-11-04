import { Skeleton } from '@/components/ui/skeleton';

export function PageSkeleton() {
  return (
    <div role="status" aria-label="Loading" className="flex flex-col gap-6">
      <Skeleton className="h-4 w-48" />
      <Skeleton className="h-8 w-80" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {Array.from({ length: 5 }, (_, index) => (
          <Skeleton key={index} className="h-36 rounded-card" />
        ))}
      </div>
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Skeleton className="h-80 rounded-card" />
        <Skeleton className="h-80 rounded-card" />
      </div>
    </div>
  );
}
