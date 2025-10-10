import prisma from "@/lib/prisma";

export const getBrands = async () => {
  try {
    const brands = await prisma.brand.findMany({});
    return brands;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getBrandById = async (id: string) => {
  try {
    const brand = await prisma.brand.findFirst({
      where: {
        id,
      },
    });

    return brand;
  } catch (error) {
    console.log(error);
    return null;
  }
};
