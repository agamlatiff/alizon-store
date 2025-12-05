import { Skeleton } from "@/components/ui/skeleton";

const ProductCardSkeleton = () => {
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-neutral-100">
      {/* Image Container Skeleton */}
      <div className="block relative aspect-[3/4] overflow-hidden bg-neutral-50">
        <Skeleton className="w-full h-full" />
      </div>

      {/* Info Skeleton */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <Skeleton className="h-3 w-20" />
        </div>

        <Skeleton className="h-6 w-full mb-2" />

        <div className="flex items-baseline gap-2 mt-2">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
