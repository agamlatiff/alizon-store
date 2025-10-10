import type { Tedit } from "@/types";

import { redirect } from "next/navigation";
import FormBrand from "@/components/dashboard/brands/FormBrand";
import { getBrandById } from "../../lib/data";


const EditPage = async ({ params }: Tedit) => {
  const brand = await getBrandById(params.id);

  if (!brand) {
    return redirect("/dashboard/brands");
  }

  return <FormBrand data={brand} type="EDIT" />;
};

export default EditPage;
