"use client";

import type { ActionResult } from "@/types";
import { Trash } from "lucide-react";
import { deleteProduct } from "../../../app/dashboard/products/lib/actions";
import { useActionState } from "react";
import Button from "@/components/ui/button";

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
      <Button variant={"secondary"}
        size={"sm"}
        disabled={pending}
        className="text-white bg-red-500 hover:bg-red-600">
        <Trash className="size-4 mr-2" />
        {pending ? "Loading..." : "Delete"}
      </Button>
    </form>
  );
};

export default FormDelete;
