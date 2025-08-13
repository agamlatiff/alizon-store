import React from "react";
import CardProduct from "../../_components/CardProduct";

const ProductListing = () => {
  return (
    <>
      <div className="grid grid-cols-3 gap-[30px]">
        {/* <a href="details.html" className="product-card">
          <div className="bg-white flex flex-col gap-[24px] p-5 rounded-[20px] ring-1 ring-[#E5E5E5] hover:ring-2 hover:ring-[#FFC736] transition-all duration-300 w-full">
            <div className="w-full h-[90px] flex shrink-0 items-center justify-center overflow-hidden">
              <img
                src="assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png"
                className="w-full h-full object-contain"
                alt="thumbnail"
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <div className="flex flex-col gap-1">
                <p className="font-semibold leading-[22px]">
                  iMac Green Energy
                </p>
                <p className="text-sm text-[#616369]">Desktops</p>
              </div>
              <p className="font-semibold text-[#0D5CD7] leading-[22px]">
                Rp 24.000.000
              </p>
            </div>
          </div>
        </a> */}
        
        <CardProduct item={{
          category_name: 'Desktops',
          id: 1,
          image_url: "assets/thumbnails/color_back_green__buxxfjccqjzm_large_2x-Photoroom 1.png",
          name: 'iMac Green Energy',
          price: 12000000
        }}/>
      </div>
    </>
  );
};

export default ProductListing;
