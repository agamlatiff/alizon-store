import { auth } from "@/lib/auth";

import Image from "next/image";
import Link from "next/link";
import Logo from "../Logo";
const Navbar = async () => {
  const session = await auth();

  return (
    <nav className="container max-w-[1130px] mx-auto flex items-center justify-between bg-[#0b2557] p-5 rounded-3xl">
      <div className="flex shrink-0 text-white">
        <Logo />
      </div>
      <ul className="flex items-center gap-[30px]">
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 font-bold text-white ">
          <Link href="/catalogs">Shop</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/categories">Categories</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/">Testimonials</Link>
        </li>
        <li className="hover:font-bold hover:text-[#FFC736] transition-all duration-300 text-white">
          <Link href="/">Rewards</Link>
        </li>
      </ul>
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <p className="text-white">{session.user?.name?.split(" ")[0]}</p>
            <div className="w-[48px] h-[48px] flex shrink-0 rounded-full p-1 border border-[#E5E5E5] overflow-hidden">
              <Image
                src={session.user?.image || ""}
                height={50}
                width={50}
                className="w-full h-full object-cover rounded-full"
                alt="photo"
              />
            </div>
          </>
        ) : (
          <>
            <Link
              href="/sign-in"
              className="p-[12px_20px] bg-white rounded-full font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="p-[12px_20px] bg-white rounded-full font-semibold"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
