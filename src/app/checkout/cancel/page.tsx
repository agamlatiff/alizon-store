import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import Button from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";

interface CancelPageProps {
  searchParams: {
    order_id?: string;
  };
}

export default async function CheckoutCancelPage({
  searchParams,
}: CancelPageProps) {
  const { order_id } = searchParams;

  // If order_id exists, update status to cancelled
  if (order_id) {
    try {
      await prisma.order.update({
        where: { id: order_id },
        data: { status: "cancelled" },
      });
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  }

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Cancel Card */}
        <div className="bg-white rounded-3xl shadow-xl shadow-neutral-100/50 p-8 md:p-12 text-center">
          {/* Cancel Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>

          {/* Title */}
          <h1 className="font-display font-bold text-3xl md:text-4xl text-brand mb-3">
            Payment Cancelled
          </h1>
          <p className="text-neutral-600 text-lg mb-8">
            Your payment was cancelled. No charges were made to your account.
          </p>

          {/* Info Box */}
          <div className="bg-surface rounded-2xl p-6 mb-8 text-left">
            <h2 className="font-bold text-lg text-brand mb-3">
              What happened?
            </h2>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>You cancelled the payment process</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Your order has been marked as cancelled</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>No payment was processed</span>
              </li>
            </ul>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 mb-8 text-left">
            <h3 className="font-bold text-lg text-brand mb-3">
              What would you like to do?
            </h3>
            <ul className="space-y-2 text-neutral-600">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Return to your cart and try again</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Continue shopping for more items</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">✓</span>
                <span>Contact support if you need help</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/carts" className="flex-1">
              <Button fullWidth className="h-12 text-base">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Back to Cart
              </Button>
            </Link>
            <Link href="/catalogs" className="flex-1">
              <Button variant="outline" fullWidth className="h-12 text-base">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              Need help?{" "}
              <a
                href="mailto:support@alizonstore.com"
                className="text-primary-600 font-semibold hover:underline"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
