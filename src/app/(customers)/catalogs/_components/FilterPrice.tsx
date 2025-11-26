"use client";

import { useFilter } from "@/hooks/useFilter";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";

const FilterPrice = () => {
  const { setFilter } = useFilter();
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        minPrice: minPrice,
      });
    }, 1500);
    
    return () => clearTimeout(debounceInput)
  }, [minPrice]);
  
    useEffect(() => {
    const debounceInput = setTimeout(() => {
      setFilter({
        maxPrice: maxPrice,
      });
    }, 1500);
    
    return () => clearTimeout(debounceInput)
  }, [maxPrice]);

  return (
    <div className="flex flex-col gap-[14px]">
      <p className="font-semibold leading-[22px]">Price Range</p>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
        <div className="flex shrink-0">
          <DollarSign className="w-5 h-5 text-neutral-500" />
        </div>
        <input
          onChange={(e) => setMinPrice(Number(e.target.value))}
          type="number"
          id=""
          name=""
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Min price"
        />
      </div>
      <div className="max-w-[480px] w-full bg-white flex items-center gap-[10px] rounded-full border border-[#E5E5E5] p-[12px_20px] focus-within:ring-2 focus-within:ring-primary transition-all duration-300">
        <div className="flex shrink-0">
          <DollarSign className="w-5 h-5 text-neutral-500" />
        </div>
        <input
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          type="number"
          id=""
          name=""
          className="appearance-none outline-none w-full placeholder:text-[#616369] placeholder:font-normal font-semibold text-black"
          placeholder="Max price"
        />
      </div>
    </div>
  );
};

export default FilterPrice;
