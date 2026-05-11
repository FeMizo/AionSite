import { cn } from "@/src/lib/utils";

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-slate-700/50",
        className
      )}
    />
  );
}

interface BlogCardSkeletonProps {
  className?: string;
}

export function BlogCardSkeleton({ className }: BlogCardSkeletonProps) {
  return (
    <div className={cn("flex h-full flex-col overflow-hidden rounded-lg border border-white/5 bg-slate-900/50 p-0", className)}>
      {/* Image skeleton */}
      <Skeleton className="h-80 w-full" />

      {/* Content skeleton */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        {/* Badge skeleton */}
        <Skeleton className="h-5 w-24 rounded-full" />

        {/* Title skeleton */}
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-full" />
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Footer skeleton */}
        <div className="flex items-center justify-between border-t border-white/5 pt-4">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}