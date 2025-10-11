import FormProduct from "../../../../components/dashboard/products/FormProduct";

import { getBrands } from "../../brands/lib/data";
import { getCategories } from "../../categories/lib/data";
import { getLocations } from "../../locations/lib/data";

const CreatePage = async () => {
  const brands = await getBrands();
  const categories = await getCategories();
  const locations = await getLocations();
  return (
    <FormProduct
      type="ADD"
      brands={brands}
      categories={categories}
      locations={locations}
    />
  );
};

export default CreatePage;
