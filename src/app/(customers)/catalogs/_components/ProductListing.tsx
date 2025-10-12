"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../lib/data";
import { useFilter } from "@/hooks/useFilter";
import CardProduct from "@/components/customers/CardProduct";
import LoadingState from "@/components/Loading";

const ProductListing = () => {
  const { filter } = useFilter();

  const { data, isLoading } = useQuery({
    queryKey: ["product-listing", filter],
    queryFn: () => fetchProduct(filter),
  });

  if (isLoading) {
    <div className="grid grid-cols-3 gap-[30px]">
      <LoadingState />
    </div>;
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-[30px]">
        {data?.map((item) => (
          <CardProduct
            key={item.id + item.name}
            item={{
              category_name: item.category_name,
              id: item.id,
              image_url: item.image_url,
              name: item.name,
              price: item.price,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ProductListing;
