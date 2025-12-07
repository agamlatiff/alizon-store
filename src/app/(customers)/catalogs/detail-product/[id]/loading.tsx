import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navbar Placeholder */}
      <div className="h-[72px] bg-white border-b border-neutral-100" />

      {/* Breadcrumb */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center gap-2">
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-12 h-4 rounded" />
          <Skeleton className="w-4 h-4 rounded" />
          <Skeleton className="w-32 h-4 rounded" />
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Left Column: Images & Info */}
          <div className="flex-1 space-y-10">

            {/* Mobile Header */}
            <div className="lg:hidden space-y-3">
              <Skeleton className="h-8 w-3/4 rounded-lg" />
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="w-4 h-4 rounded" />
                ))}
              </div>
            </div>

            {/* Gallery Skeleton */}
            <div className="space-y-4">
              {/* Main Image */}
              <Skeleton className="aspect-square w-full rounded-3xl" />

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="aspect-square rounded-xl" />
                ))}
              </div>
            </div>

            {/* Product Info Skeleton */}
            <div className="space-y-8">
              {/* Desktop Title */}
              <div className="hidden lg:block space-y-4">
                <Skeleton className="h-10 w-2/3 rounded-lg" />
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="w-5 h-5 rounded" />
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-3">
                <Skeleton className="h-6 w-40 rounded-lg" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-full rounded" />
                <Skeleton className="h-4 w-3/4 rounded" />
              </div>

              {/* Reviews Section */}
              <div className="border-t border-neutral-100 pt-8 space-y-6">
                <Skeleton className="h-6 w-48 rounded-lg" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[1, 2].map((review) => (
                    <div key={review} className="bg-neutral-50 p-6 rounded-2xl space-y-4">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-full" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24 rounded" />
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Skeleton key={i} className="w-3 h-3 rounded" />
                            ))}
                          </div>
                        </div>
                        <Skeleton className="ml-auto h-3 w-16 rounded" />
                      </div>
                      <Skeleton className="h-4 w-full rounded" />
                      <Skeleton className="h-4 w-4/5 rounded" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Price & Actions */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-28 bg-white border border-neutral-100 rounded-3xl p-8 shadow-sm space-y-6">
              {/* Price */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-10 w-32 rounded-lg" />
              </div>

              {/* Details */}
              <div className="space-y-4 py-6 border-y border-neutral-100">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="w-5 h-5 rounded" />
                    <Skeleton className="h-4 w-32 rounded" />
                  </div>
                ))}
              </div>

              {/* Quantity */}
              <div className="space-y-3">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>

              {/* Add to Cart Button */}
              <Skeleton className="h-14 w-full rounded-xl" />

              {/* Wishlist Button */}
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-24 border-t border-neutral-100 pt-16 space-y-8">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="aspect-square rounded-2xl" />
                <Skeleton className="h-4 w-3/4 rounded" />
                <Skeleton className="h-4 w-1/2 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
