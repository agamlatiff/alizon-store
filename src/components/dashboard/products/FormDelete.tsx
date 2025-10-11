"use client";

import { Button } from "@/components/ui/button";
import type { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { deleteProduct } from "../../../app/dashboard/products/lib/actions";
import { useActionState } from "react";

const initialState: ActionResult = {
  error: "",
};

interface FormDeleteProps {
  id: string;
}

const FormDelete = ({ id }: FormDeleteProps) => {
  const deleteProductById = (_: unknown, formData: FormData) =>
    deleteProduct(_, formData, id);

  const [state, formAction, pending] = useActionState(
    deleteProductById,
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
