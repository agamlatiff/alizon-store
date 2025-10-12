import { getBrands } from "@/app/dashboard/brands/lib/data";
import FilterCheckboxItem from "./FilterCheckboxItem";

const FilterBrand = async () => {
  const brands = await getBrands();

  return (
    <>
      <div className="flex flex-col gap-[14px]">
        <p className="font-semibold leading-[22px]">Brands</p>
        {brands.map((item) => (
          <FilterCheckboxItem
            key={item.id + item.name}
            id={item.id.toString()}
            value={item.name}
            type={"brand"}
          />
        ))}
      </div>
    </>
  );
};

export default FilterBrand;
