"use client";

import { useFilter, type SortOption } from "@/hooks/useFilter";

const SortDropdown = () => {
  const { filter, setFilter } = useFilter();

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter({ sortBy: e.target.value as SortOption });
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-neutral-500">Sort by:</span>
      <select
        value={filter.sortBy || "popular"}
        onChange={handleSortChange}
        className="bg-neutral-50 border border-neutral-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary/50"
      >
        <option value="popular">Most Popular</option>
        <option value="newest">Newest</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default SortDropdown;
