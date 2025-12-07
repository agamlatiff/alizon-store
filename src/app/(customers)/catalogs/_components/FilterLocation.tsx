import { getLocationsCached } from "@/lib/cache";
import FilterCheckboxItem from "./FilterCheckboxItem";


const FilterLocation = async () => {
  const locations = await getLocationsCached();

  return (
    <>
      <div className="flex flex-col gap-[14px]">
        <p className="font-semibold leading-[22px]">Location</p>

        {locations.map((item) => (
          <FilterCheckboxItem
            key={item.id + item.name}
            id={item.id.toString()}
            value={item.name}
            type={"location"}
          />
        ))}
      </div>
    </>
  );
};

export default FilterLocation;
