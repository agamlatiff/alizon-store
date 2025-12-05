import { getImageUrl } from "@/lib/supabase";
import prisma from "@/lib/prisma";

import { unstable_cache } from "next/cache";

export const getProductById = unstable_cache(
  async (id: string) => {
    try {
      const product = await prisma.product.findFirst({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          _count: {
            select: {
              orders: true,
            },
          },
          images: true,
          description: true,
          price: true,
          category: {
            select: {
              name: true,
            },
          },
        },
      });

      if (!product) {
        return null;
      }

      return {
        ...product,
        price: Number(product.price),
        images: product.images.map((img) => {
          return getImageUrl(img, "products");
        }),
      };
    } catch (e) {
      console.log(e);
      return null;
    }
  },
  ['product-detail'],
  { revalidate: 3600, tags: ['products'] }
);
