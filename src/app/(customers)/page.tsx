import { Suspense } from "react";

import Navbar from "../../components/customers/Navbar";
import ListProducts from "@/components/customers/ListProducts";

import Image from "next/image";
import LoadingState from "@/components/Loading";


const LandingPage = async () => {
  return (
    <>
      <header className="bg-[#EFF3FA] pt-[30px] pb-[50px] ">
        <Navbar />
        <div className="container max-w-[1130px] mx-auto flex items-center justify-between gap-1 mt-[50px]">
          <div className="flex flex-col gap-[30px]">
            <div className="flex items-center gap-[10px] p-[8px_16px] rounded-full bg-white w-fit">
              <div className="w-[22px] h-[22px] flex shrink-0">
                <Image
                  height={24}
                  width={24}
                  src="/assets/icons/crown.svg"
                  alt="icon"
                />
              </div>
              <p className="font-semibold text-sm">
                Most Popular 100th Product in AlizonStore
              </p>
            </div>
            <div className="flex flex-col gap-[14px]">
              <h1 className="font-bold text-[50px] leading-[55px] text-nowrap">
                Look 10x More Stylish
              </h1>
              <p className="text-lg leading-[34px] text-[#6A7789]">
                Discover a modern fashion collection designed to highlight your
                unique style and confidence. Every piece is crafted with
                elegance and premium quality — made to elevate your look for
                every moment.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href=""
                className="p-[18px_24px] rounded-full font-semibold bg-[#0D5CD7] text-white"
              >
                Add to Cart
              </a>
              <a
                href=""
                className="p-[18px_24px] rounded-full font-semibold bg-white"
              >
                View Details
              </a>
            </div>
          </div>
          <div className="w-[588px] h-[360px] flex shrink-0 overflow-hidden relative  left-12">
            <Image
              height={600}
              width={600}
              src="/assets/background.jpg"
              className="object-contain  rounded-md"
              alt="Image Hero"
            />
            <div className="absolute top-[60%] bg-white p-[14px_16px] rounded-3xl flex items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  height={24}
                  width={24}
                  src="/assets/icons/code-circle.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
              </div>
              <p className="font-semibold text-sm">
               Free guarantees <br /> on all products
              </p>
            </div>
            <div className="absolute right-0 top-[30%] bg-white p-[14px_16px] rounded-3xl flex flex-col items-center gap-[10px]">
              <div className="w-12 h-12 flex shrink-0 rounded-full items-center justify-center bg-[#FFC736] overflow-hidden">
                <Image
                  height={24}
                  width={24}
                  src="/assets/icons/star-outline.svg"
                  className="w-6 h-6"
                  alt="icon"
                />
              </div>
              <p className="font-semibold text-sm text-center">
                Include <br /> Warranty
              </p>
            </div>
          </div>
        </div>
        <div className="container max-w-[1130px] mx-auto flex items-center justify-center gap-10 mt-[50px]">
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                height={24}
                width={24}
                src="/assets/photos/p1.png"
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">
                Awesome product!
              </p>
              <p className="text-xs leading-[18px]">Jemmie Pemilia</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                height={24}
                width={24}
                src="/assets/photos/p2.png"
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">
                Money saver 25%
              </p>
              <p className="text-xs leading-[18px]">Angga Risky</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                height={24}
                width={24}
                src="/assets/photos/p3.png"
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">
                I love the warranty
              </p>
              <p className="text-xs leading-[18px]">Petina Malaka</p>
            </div>
          </div>
          <div className="flex items-center gap-[10px]">
            <div className="w-[50px] h-[50px] flex shrink-0 rounded-full border-[5px] border-white overflow-hidden">
              <Image
                height={24}
                width={24}
                src="/assets/photos/p4.png"
                className="w-full h-full object-cover"
                alt="photo"
              />
            </div>
            <div className="flex flex-col gap-[2px]">
              <p className="font-semibold text-sm leading-[22px]">
                Big deals ever!
              </p>
              <p className="text-xs leading-[18px]">Udin Sarifun</p>
            </div>
          </div>
        </div>
      </header>
      <section
        id="content"
        className="container max-w-[1130px] mx-auto flex flex-col gap-[50px] pt-[50px] pb-[100px]"
      ></section>

      <section className="container max-w-[1130px] mx-auto flex flex-col gap-[50px] ">
        <Suspense fallback={<LoadingState />}>
          <ListProducts
            title={
              <>
                Most Picked <br /> Quality Products
              </>
            }
          />
        </Suspense>
      </section>
    </>
  );
};

export default LandingPage;
