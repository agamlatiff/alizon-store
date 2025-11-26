import { getCategories } from "@/app/dashboard/categories/lib/data";
import FilterCheckboxItem from "./FilterCheckboxItem";


const FilterCategories = async () => {
  const categories = await getCategories();
  return (
    <>
      <div className="flex flex-col gap-[14px]">
        <p className="font-semibold leading-[22px]">Categories</p>
        {categories.map((item) => (
          <FilterCheckboxItem
            key={item.id + item.name}
            id={item.id.toString()}
            value={item.name}
            type={"category"}
          />
        ))}
      </div>
    </>
  );
};

export default FilterCategories;
