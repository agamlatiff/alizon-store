import { redirect } from "next/navigation";
import { getLocationsById } from "../../lib/data";
import type { Tedit } from "@/types";
import FormLocation from "@/components/dashboard/locations/FormLocation";

const EditPage = async ({ params }: Tedit) => {
  const data = await getLocationsById(params.id);

  if (!data) {
    return redirect("/dashboard/locations");
  }
  return <FormLocation type="EDIT" data={data} />;
};

export default EditPage;
