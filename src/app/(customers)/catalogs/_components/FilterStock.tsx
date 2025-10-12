import FilterCheckboxItem from "./FilterCheckboxItem";

const FilterStock = () => {
  return (
    <>
      <div className="flex flex-col gap-[14px]">
        <p className="font-semibold leading-[22px]">Stocks</p>
        <FilterCheckboxItem id={"ready"} value="Ready" type="stock" />
        <FilterCheckboxItem id={"preorder"} value="Pre-order" type="stock" />
      </div>
    </>
  );
};

export default FilterStock;
