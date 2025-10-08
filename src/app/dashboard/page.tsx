import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, ShoppingBag, Users } from "lucide-react";

import { rupiahFormat } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getDashboardData } from "./lib/data";
import OverviewChart from "@/components/dashboard/OverviewChart";
import Header from "@/components/dashboard/Header";
import Link from "next/link";

export default async function DashboardPage() {
  const { totalRevenue, totalSales, totalCustomers, recentOrders, salesData } =
    await getDashboardData();

  return (
    <>
      <Header>
        <Link href={"/dashboard"}>Home</Link>
      </Header>
      <main className="py-4 px-6">
        <div className="flex-1 space-y-4 pt-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Revenue
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {rupiahFormat(Number(totalRevenue))}
                </div>
                <p className="text-xs text-muted-foreground">
                  Based on all successful sales
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Sales</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+{totalSales}</div>
                <p className="text-xs text-muted-foreground">
                  Total successful transactions
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Customers
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalCustomers}</div>
                <p className="text-xs text-muted-foreground">
                  All registered customers
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <OverviewChart data={salesData} />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made {recentOrders.length} recent sales.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center">
                      <Avatar className="h-9 w-9">
                        <AvatarImage
                          src={order.user?.image || "/avatars/01.png"}
                          alt="Avatar"
                        />
                        <AvatarFallback>
                          {order.user?.name
                            ? order.user.name.charAt(0).toUpperCase()
                            : ""}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {order.user?.name ?? "Guest"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {order.user?.email}
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        +{rupiahFormat(Number(order.total))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
