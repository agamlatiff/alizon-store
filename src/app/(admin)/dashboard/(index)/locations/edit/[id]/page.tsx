import { redirect } from "next/navigation";
import { getLocationsById } from "../../lib/data";
import FormLocation from "../../_components/FormLocation";
import type { Tedit } from "@/types";

const EditPage = async ({ params }: Tedit) => {
  const data = await getLocationsById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }
  return <FormLocation type="EDIT" data={data} />;
};

export default EditPage;
