import { redirect } from "next/navigation";
import { getCategoriesById } from "../../lib/data";
import FormCategory from "../../_components/FormCategory";
import type { Tedit } from "@/types";

const EditPage = async ({ params }: Tedit) => {
  const data = await getCategoriesById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }
  return <div className="px-6 py-4">
    <FormCategory type="EDIT" data={data} />;
  </div>
};

export default EditPage;
