import prisma from "lib/prisma";

export async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true,
          },
        },
      },
    });
    
    return categories
  } catch (e) {
    console.log(e);
    return [];
  }
}
