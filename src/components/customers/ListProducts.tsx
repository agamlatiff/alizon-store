import React, { type ReactNode } from "react";

import CardProduct from "./CardProduct";
import { getProducts } from "@/app/(customers)/lib/data";
import Link from "next/link";

interface ListProductProps {
  title: ReactNode;
  isShowDetail?: boolean;
}

const ListProducts = async ({
  title,
  isShowDetail = true,
}: ListProductProps) => {
  const products = await getProducts();

  return (
    <div id="picked" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">{title}</h2>
        {isShowDetail && (
          <Link
            href="/catalog"
            className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
          >
            Explore All
          </Link>
        )}
      </div>
      <div className="grid grid-cols-5 gap-[30px]">
        {products.slice(0,5).map((item) => (
          <CardProduct
            key={item.id}
            item={{
              category_name: item.category.name,
              id: item.id,
              image_url: item.image_url,
              name: item.name,
              price: Number(item.price),
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ListProducts;
