import Link from "next/link";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import Button from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { USDFormat } from "@/lib/utils";
import { redirect } from "next/navigation";

interface SuccessPageProps {
  searchParams: {
    session_id?: string;
    order_id?: string;
  };
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { order_id } = searchParams;

  if (!order_id) {
    redirect("/");
  }

  // Fetch order details
  const order = await prisma.order.findUnique({
    where: { id: order_id },
    include: {
      products: {
        include: {
          product: true,
        },
      },
      detail: true,
    },
  });

  if (!order) {
    redirect("/");
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-neutral-100/50 p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-brand mb-3">
            Payment Successful! 🎉
          </h1>
          <p className="text-neutral-600 text-lg mb-8">
            Thank you for your purchase. Your order has been confirmed.
          </p>

          {/* Order Info */}
          <div className="bg-surface rounded-2xl p-6 mb-8 text-left">
            <div className="flex items-center gap-3 mb-4">
              <Package className="w-6 h-6 text-primary" />
              <h2 className="font-bold text-xl text-brand">Order Details</h2>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Order ID</span>
                <span className="font-semibold text-brand">
                  #{order.id.slice(0, 8)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Status</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                  {order.status === "success" ? "Paid" : "Processing"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Total Amount</span>
                <span className="font-bold text-xl text-primary-600">
                  {USDFormat(Number(order.total))}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-600">Items</span>
                <span className="font-semibold text-brand">
                  {order.products.length} item(s)
                </span>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          {order.detail && (
            <div className="bg-surface rounded-2xl p-6 mb-8 text-left">
              <h3 className="font-bold text-lg text-brand mb-3">
                Shipping Address
              </h3>
              <div className="space-y-1 text-neutral-600">
                <p className="font-semibold text-brand">
                  {order.detail.name}
                </p>
                <p>{order.detail.address}</p>
                <p>
                  {order.detail.city}, {order.detail.postal_code}
                </p>
                <p>{order.detail.phone}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/orders" className="flex-1">
              <Button fullWidth className="h-12 text-base">
                View Orders
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/catalogs" className="flex-1">
              <Button variant="outline" fullWidth className="h-12 text-base">
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              A confirmation email has been sent to your email address.
              <br />
              You can track your order status in the{" "}
              <Link
                href="/orders"
                className="text-primary-600 font-semibold hover:underline"
              >
                Orders
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
