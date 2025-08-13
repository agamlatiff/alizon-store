"use client";

import { useQuery } from "@tanstack/react-query";
import CardProduct from "../../_components/CardProduct";
import { fetchProduct } from "../lib/data";

const ProductListing = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["product-listing"],
    queryFn: () => fetchProduct(),
  });

  if (isLoading) {
    <div className="grid grid-cols-3 gap-[30px]">
      <span>Loading...</span>
    </div> 
  }

  return (
    <>
      <div className="grid grid-cols-3 gap-[30px]">
        {data?.map((item) => (
          <CardProduct
            key={item.id + item.name}
            item={{
              category_name: "Desktops",
              id: 1,
              image_url:
                "assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png",
              name: "iMac Green Energy",
              price: 12000000,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default ProductListing;
