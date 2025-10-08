import prisma from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const categories = await prisma.category.findMany({});

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
        id: Number.parseInt(id),
      },
    });
    return category;
  } catch (error) {
    console.log(error);
    return null;
  }
};
