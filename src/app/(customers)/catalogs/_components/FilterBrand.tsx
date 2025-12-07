import { getBrandsCached } from "@/lib/cache";
import FilterCheckboxItem from "./FilterCheckboxItem";

const FilterBrand = async () => {
  const brands = await getBrandsCached();

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
