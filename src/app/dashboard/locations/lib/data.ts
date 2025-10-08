import prisma from "@/lib/prisma";

export const getLocations = async () => {
  try {
    const locations = await prisma.location.findMany({});

    return locations;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getLocationsById = async (id: string) => {
  try {
    const location = await prisma.location.findFirst({
      where: {
        id: Number.parseInt(id),
      },
    });
    return location;
  } catch (error) {
    console.log(error);
    return null;
  }
};
