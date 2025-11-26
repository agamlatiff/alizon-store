import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Navbar from "@/components/customers/Navbar";
import Footer from "@/components/customers/Footer";
import { User, Mail, Calendar, Shield } from "lucide-react";
import Image from "next/image";

const ProfilePage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  return (
    <>
      <Navbar session={session} />

      <div className="min-h-screen bg-neutral-50 py-12">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-display font-bold text-brand mb-2">
              My Profile
            </h1>
            <p className="text-neutral-500">
              Manage your account information
            </p>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
            {/* Header with gradient */}
            <div className="h-32 bg-gradient-to-r from-primary to-primary-600"></div>

            {/* Avatar & Basic Info */}
            <div className="px-6 md:px-8 pb-8">
              <div className="flex flex-col md:flex-row items-center md:items-end gap-6 -mt-16 mb-8">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white">
                  {user?.image ? (
                    <Image
                      src={user.image}
                      alt={user.name || "User"}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand flex items-center justify-center text-white text-4xl font-bold">
                      {user?.name?.charAt(0) || "U"}
                    </div>
                  )}
                </div>

                <div className="text-center md:text-left flex-1">
                  <h2 className="text-2xl font-bold text-brand mb-1">
                    {user?.name || "User"}
                  </h2>
                  <p className="text-neutral-500 text-sm">
                    Member since {new Date().getFullYear()}
                  </p>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                      Email Address
                    </p>
                    <p className="text-brand font-medium truncate">
                      {user?.email || "Not provided"}
                    </p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                      Account Type
                    </p>
                    <p className="text-brand font-medium capitalize">
                      {user?.role || "Customer"}
                    </p>
                  </div>
                </div>

                {/* User ID */}
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                      User ID
                    </p>
                    <p className="text-brand font-medium font-mono text-sm truncate">
                      {user?.id || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="flex items-start gap-4 p-4 bg-neutral-50 rounded-xl">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-neutral-500 uppercase font-semibold mb-1">
                      Member Since
                    </p>
                    <p className="text-brand font-medium">
                      {new Date().toLocaleDateString("en-US", {
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Account Stats */}
              <div className="mt-8 pt-8 border-t border-neutral-100">
                <h3 className="font-bold text-brand mb-4">Account Statistics</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-primary-100 rounded-xl">
                    <p className="text-2xl font-bold text-brand mb-1">0</p>
                    <p className="text-xs text-neutral-600">Total Orders</p>
                  </div>
                  <div className="text-center p-4 bg-primary-100 rounded-xl">
                    <p className="text-2xl font-bold text-brand mb-1">$0</p>
                    <p className="text-xs text-neutral-600">Total Spent</p>
                  </div>
                  <div className="text-center p-4 bg-primary-100 rounded-xl">
                    <p className="text-2xl font-bold text-brand mb-1">0</p>
                    <p className="text-xs text-neutral-600">Wishlist Items</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href="/orders"
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-100 hover:border-primary transition-colors group"
            >
              <span className="font-semibold text-brand">View My Orders</span>
              <span className="text-primary group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <a
              href="/catalogs"
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-100 hover:border-primary transition-colors group"
            >
              <span className="font-semibold text-brand">Continue Shopping</span>
              <span className="text-primary group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ProfilePage;
