import Navbar from "../../../components/customers/Navbar";
import Footer from "../../../components/customers/Footer";
import FilterBrand from "./_components/FilterBrand";
import FilterCategories from "./_components/FilterCategories";
import FilterLocation from "./_components/FilterLocation";
import FilterPrice from "./_components/FilterPrice";
import FilterStock from "./_components/FilterStock";
import ProductListing from "./_components/ProductListing";
import SearchBar from "./_components/SearchBar";
import SortDropdown from "./_components/SortDropdown";
import { auth } from "@/lib/auth";

const CatalogPage = async () => {
  const session = await auth();
  return (
    <>
      <Navbar session={session} />

      {/* Page Header */}
      <div className="bg-neutral-900 py-16 mb-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">Shop All Products</h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Explore our premium collection of fashion, accessories, and more. Find your perfect style today.
          </p>
        </div>
      </div>

      <div
        id="catalog"
        className="container mx-auto px-4 md:px-6 flex flex-col lg:flex-row gap-10 pb-24"
      >
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm space-y-8 sticky top-24">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-xl text-brand">Filters</h2>
              <button className="text-sm text-neutral-500 hover:text-primary transition-colors">Reset</button>
            </div>

            <div className="space-y-6">
              <FilterPrice />
              <div className="h-px bg-neutral-100" />
              <FilterStock />
              <div className="h-px bg-neutral-100" />
              <FilterBrand />
              <div className="h-px bg-neutral-100" />
              <FilterLocation />
              <div className="h-px bg-neutral-100" />
              <FilterCategories />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          <div className="mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-xl border border-neutral-100 shadow-sm">
            <p className="text-neutral-500 text-sm">Showing <span className="font-bold text-brand">All</span> Products</p>
            <SortDropdown />
          </div>

          <ProductListing />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CatalogPage;
