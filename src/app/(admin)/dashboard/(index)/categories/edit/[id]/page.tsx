import { redirect } from "next/navigation";
import { getCategoriesById } from "../../lib/data";
import FormCategory from "../../_components/FormCategory";

type params = { id: string };

const EditPage = async ({ params }: { params: params }) => {
  const data = await getCategoriesById(params.id);

  if (!data) {
    return redirect("/dashboard/categories");
  }
  return <FormCategory type="EDIT" data={data} />;
};

export default EditPage;
