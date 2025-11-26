import Navbar from "../../../components/customers/Navbar";
import Footer from "../../../components/customers/Footer";
import CartProduct from "./_components/CartProduct";
import CheckoutForm from "./_components/CheckoutForm";
import { auth } from "@/lib/auth";

const CartsPage = async () => {
  const session = await auth();
  return (
    <>
      <Navbar session={session} />
      
      {/* Page Header */}
      <div className="bg-neutral-900 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Checkout</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Review your items and complete your purchase securely.
          </p>
        </div>
      </div>

      <CartProduct />
      <CheckoutForm />
      
      <Footer />
    </>
  );
};

export default CartsPage;
