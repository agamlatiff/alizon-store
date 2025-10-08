import prisma from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        created_at: true,
        updated_at: true,
        status: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return categories;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getCategoriesById = async (id: string) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id,
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
};
