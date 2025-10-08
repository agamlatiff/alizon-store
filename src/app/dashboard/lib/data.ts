import prisma from "@/lib/prisma";

export const getDashboardData = async () => {
  try {
    const totalRevenue = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
      where: {
        status: "success",
      },
    });

    const totalSales = await prisma.order.count({
      where: {
        status: "success",
      },
    });

    const totalCustomers = await prisma.user.count({
      where: {
        role: "customer",
      },
    });

    const recentOrders = await prisma.order.findMany({
      take: 5,
      where: {
        status: "success",
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
          },
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    // Mengambil data penjualan bulanan dari database
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

    const orders = await prisma.order.findMany({
      where: {
        status: "success",
        created_at: {
          gte: startOfYear,
          lte: endOfYear,
        },
      },
      select: {
        total: true,
        created_at: true,
      },
    });

    const monthlySales = [
      { name: "Jan", total: 0 },
      { name: "Feb", total: 0 },
      { name: "Mar", total: 0 },
      { name: "Apr", total: 0 },
      { name: "May", total: 0 },
      { name: "Jun", total: 0 },
      { name: "Jul", total: 0 },
      { name: "Aug", total: 0 },
      { name: "Sep", total: 0 },
      { name: "Oct", total: 0 },
      { name: "Nov", total: 0 },
      { name: "Dec", total: 0 },
    ];

    for (const order of orders) {
      const month = order.created_at.getMonth(); // 0 for Jan, 1 for Feb, etc.
      monthlySales[month].total += Number(order.total);
    }

    return {
      totalRevenue: totalRevenue._sum.total ?? 0,
      totalSales,
      totalCustomers,
      recentOrders,
      salesData: monthlySales,
    };
  } catch (error) {
    console.error("Failed to fetch dashboard data:", error);
    return {
      totalRevenue: 0,
      totalSales: 0,
      totalCustomers: 0,
      recentOrders: [],
      salesData: [],
    };
  }
};

