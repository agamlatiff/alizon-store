"use client";

import { Button } from "@/components/ui/button";
import type { TypeCheckingBrand } from "@/types";
import { Trash } from "lucide-react";
import { deleteBrand } from "../../../app/dashboard/brands/lib/actions";
import { useActionState } from "react";

const initialState: TypeCheckingBrand = {
  country: "",
  description: "",
  logo: "",
  name: "",
  status: "",
  website: "",
  error: "",
};

interface FormDeleteProps {
  id: string;
}

const FormDelete = ({ id }: FormDeleteProps) => {
  const deleteBrandById = (_: unknown, formData: FormData) =>
    deleteBrand(_, formData, id);

  const [state, formAction, pending] = useActionState(
    deleteBrandById,
    initialState
  );

  return (
    <form action={formAction}>
      <Button variant={"destructive"} size={"sm"} disabled={pending}>
        <Trash className="size-4 mr-2" />
        {pending ? "Loading..." : "Delete"}
      </Button>
    </form>
  );
};

export default FormDelete;
