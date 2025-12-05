import ProductCardSkeleton from "./ProductCardSkeleton";
import { ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const NewArrivalsSkeleton = () => {
  return (
    <section className="container mx-auto px-4 md:px-6 pt-20 pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Skeleton className="h-px w-8" />
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-64" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[...Array(4)].map((_, idx) => (
          <ProductCardSkeleton key={idx} />
        ))}
      </div>
    </section>
  );
};

export default NewArrivalsSkeleton;
