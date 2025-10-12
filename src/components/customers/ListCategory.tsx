import FilterCheckboxItem from "@/app/(customers)/catalogs/_components/FilterCheckboxItem";
import { getCategories } from "@/app/(customers)/lib/data";

const ListCategory = async () => {
  const categories = await getCategories();

  return (
    <div id="categories" className="flex flex-col gap-[30px]">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-2xl leading-[34px]">
          Browse Products <br /> by Categories
        </h2>
        <a
          href="catalog.html"
          className="p-[12px_24px] border border-[#E5E5E5] rounded-full font-semibold"
        >
          Explore All
        </a>
      </div>
      <div className="grid grid-cols-4 gap-[30px]">
        {categories.map((category) => (
          <FilterCheckboxItem
            type="category"
            key={category.id}
            id={category.id.toString()}
            value={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ListCategory;
