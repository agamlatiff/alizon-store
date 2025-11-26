import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/customers/Navbar";
import Footer from "@/components/customers/Footer";
import prisma from "@/lib/prisma";
import { Package, Clock, CheckCircle, XCircle, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getImageUrl } from "@/lib/supabase";

async function getUserOrders(userId: string) {
  return await prisma.order.findMany({
    where: {
      user_id: userId,
    },
    include: {
      products: {
        include: {
          product: {
            include: {
              category: true,
            },
          },
        },
      },
      detail: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });
}

const OrdersPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const orders = await getUserOrders(session?.user?.id ?? "");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "pending":
        return <Clock className="w-5 h-5 text-orange-600" />;
      case "failed":
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Package className="w-5 h-5 text-neutral-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-700 border-green-200";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-neutral-100 text-neutral-700 border-neutral-200";
    }
  };

  return (
    <>
      <Navbar session={session} />

      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand mb-2">
              My Orders
            </h1>
            <p className="text-neutral-500">
              Track and manage your orders
            </p>
          </div>

          {/* Orders List */}
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-12 text-center">
              <Package className="w-16 h-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand mb-2">No Orders Yet</h3>
              <p className="text-neutral-500 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Link
                href="/catalogs"
                className="inline-flex items-center gap-2 bg-primary text-brand font-bold px-6 py-3 rounded-full hover:bg-primary-600 transition-colors"
              >
                Start Shopping
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Order Header */}
                  <div className="bg-neutral-50 px-6 py-4 border-b border-neutral-100">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                            Order ID
                          </p>
                          <p className="font-mono text-sm font-bold text-brand">
                            {order.code}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                            Order Date
                          </p>
                          <p className="text-sm font-medium text-brand">
                            {new Date(order.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                        <div
                          className={`flex items-center gap-2 px-4 py-2 rounded-full border ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="text-sm font-bold capitalize">
                            {order.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <div className="space-y-4">
                      {order.products.map((orderProduct) => (
                        <div
                          key={orderProduct.id}
                          className="flex items-center gap-4 pb-4 border-b border-neutral-100 last:border-0 last:pb-0"
                        >
                          {/* Product Image */}
                          <div className="w-20 h-20 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                            {orderProduct.product.images[0] ? (
                              <img
                                src={getImageUrl(
                                  orderProduct.product.images[0],
                                  "products"
                                )}
                                alt={orderProduct.product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-neutral-400">
                                <Package className="w-8 h-8" />
                              </div>
                            )}
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-brand mb-1 truncate">
                              {orderProduct.product.name}
                            </h4>
                            <p className="text-sm text-neutral-500">
                              {orderProduct.product.category.name}
                            </p>
                            <p className="text-sm text-neutral-600 mt-1">
                              Quantity: <span className="font-semibold">{orderProduct.quantity}</span>
                            </p>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-brand">
                              ${Number(orderProduct.subtotal).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="mt-6 pt-6 border-t border-neutral-100 flex justify-between items-center">
                      <div>
                        {order.detail && (
                          <div className="text-sm text-neutral-600">
                            <p className="font-semibold mb-1">Shipping Address:</p>
                            <p>{order.detail.address}, {order.detail.city}</p>
                            <p>{order.detail.postal_code}</p>
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-neutral-500 mb-1">Total Amount</p>
                        <p className="text-2xl font-bold text-brand">
                          ${Number(order.total).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default OrdersPage;
