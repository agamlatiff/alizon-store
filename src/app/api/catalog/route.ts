import type { TFilter } from "@/hooks/useFilter";
import { getImageUrl } from "@/lib/supabase";
import type { TProduct } from "@/types";
import { Prisma } from "@prisma/client";
import prisma from "lib/prisma";

export async function POST(request: Request) {
  try {
    const res = (await request.json()) as TFilter;
    const ORQuery: Prisma.ProductWhereInput[] = [];

    if (res.search !== "") {
      ORQuery.push({
        name: {
          contains: res.search,
          mode: "insensitive",
        },
      });
    }

    if (res.minPrice && res.minPrice > 0) {
      ORQuery.push({
        price: {
          gte: res.minPrice,
        },
      });
    }

    if (res.maxPrice && res.maxPrice) {
      ORQuery.push({
        price: {
          lte: res.maxPrice,
        },
      });
    }

    if (res.stock && res.stock.length > 0) {
      ORQuery.push({
        stock: {
          in: res.stock,
        },
      });
    }

    if (res.brands && res.brands.length > 0) {
      ORQuery.push({
        brand: {
          id: {
            in: res.brands,
          },
        },
      });
    }

    if (res.categories && res.categories.length > 0) {
      ORQuery.push({
        category: {
          id: {
            in: res.categories,
          },
        },
      });
    }

    if (res.locations && res.locations.length > 0) {
      ORQuery.push({
        location: {
          id: {
            in: res.locations,
          },
        },
      });
    }

    const products = await prisma.product.findMany({
      where: {
        OR: ORQuery.length > 0 ? ORQuery : undefined,
      },
      select: {
        id: true,
        images: true,
        name: true,
        category: {
          select: {
            name: true,
          },
        },
        price: true
      },
    });
    
    const response : TProduct[] = products.map((item) => {
      return {
        id: item.id,
        category_name : item.category.name,
        image_url : getImageUrl(item.images[0], 'products'),
        name : item.name,
        price : Number(item.price),
      }
    }) 
    
    return Response.json(response)
  } catch (e) {
    console.log(e);
    return Response.json({status: false}, {status: 500});
  }
}
